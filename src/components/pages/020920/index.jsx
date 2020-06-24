import React, { Component } from 'react';
import Prism from "prismjs";

import BlogPost from '../../templates/blog-post/base';

class P020920 extends Component {
    componentDidMount () {
        Prism.highlightAll();
    }

    render () {
        return (
            <BlogPost id="p020920" title="Java Debugging: High CPU Usage" subtitle="02.09.2020">
                <p>
                    I recently got handed over an existing service with the goal of revamping the architecture; but before I could
                    start making changes I needed to understand the current state of the system. This involved not only reviewing the
                    code base but also familiarizing myself with how the application is deployed and run in production. During the review,
                    one area that I focused on was the resource consumption of the application(s). A good tool to help with this is dstat.
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-bash">$ dstat --vmstat</code>
                </pre>

                <p>
                    Logging into a node I ran the above command and highlighted in red was the nodes CPU. The CPU was running close to
                    100% with little fluctuation. Using top I was able to identify the exact process that was causing the issue and to
                    no surprise, it was apart of the application. I dug a little deeper using top with the flag -H to instruct top to display
                    the individual threads. The reason for running in this mode was to check if there was a specific part of the process
                    causing the issue. All threads within the process were consuming the same amount of the CPU, so the next step
                    was to get a thread dump of the process. To do this I needed to update the systemd file for the application to enable
                    jvm debug logging:
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-bash">-XX:+UnlockDiagnosticVMOptions -XX:+LogVMOutput -XX:LogFile=C:\temp\jvmoutput.log</code>
                </pre>

                <p>
                    I would not recommend enabling this on all nodes since it does have a performance hit. Once the configuration
                    had been applied, I gathered a thread dump via this <a href="https://gist.github.com/comeaujoseph/362df91f173347a047888b4f1a45ab86" target="_blank">script</a>.
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-bash">$ sh ./threaddump_linux-continuous.sh PID</code>
                </pre>

                <div className="blog-post__note">
                    <b>!!</b> The thread dumps will be in the file specified in the systemd file: /temp/jvmoutput.log <b>!!</b>
                </div>

                <p>
                    I let the script run for about 5 minutes to make sure it captured a majority of the operations performed by
                    the process. I then uploaded the output to a thread dump analyzer; I used <a href="https://fastthread.io/ft-index.jsp" target="_blank">fastthread.io</a>.
                    The analyzer highlighted the exact area where the threads were hanging:
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-bash">priority:5 - threadId:0x00007faf08102000 - nativeId:0x730a - nativeId (decimal):29450 - state:RUNNABLE</code>
                    <code className="language-bash">stackTrace:</code>
                    <code className="language-bash">java.lang.Thread.State: RUNNABLE</code>
                    <code className="language-bash">at java.io.BufferedReader.fill(BufferedReader.java:161)</code>
                    <code className="language-bash">at java.io.BufferedReader.readLine(BufferedReader.java:324)</code>
                    <code className="language-bash">...</code>
                    <code className="language-bash">at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)</code>
                    <code className="language-bash">at java.lang.Thread.run(Thread.java:745)</code>
                </pre>

                <p>
                    From the above stack trace, the threads were blocking on the Java BufferedReader.readLine(),
                    which was apart of a TCP client we are using to communicate with an internal service.  BufferedReader.readLine() blocks
                    until it finds an end-of-line in the input, but there is no guarantee that the data will come in at line boundaries.
                    This will cause issues if the server that you are communicating does not properly end the line or close the communication.
                    To solve this issue we wrote a custom Reader to handle the stream of data returned by the service to append a newline.
                    We then set a flag (done) to true indicating that readLine is ready to be used.
                    This tweak guaranteed that the readLine() would always have a closing character preventing it from blocking. CPU usage
                    was brought down to less than 10% allowing us to cut infrastructure cost, while at the same time expand our capcity.
                </p>

                <section className="blog-post__references">
                    <h3>References</h3>
                    <a href="https://www.tecmint.com/dstat-monitor-linux-server-performance-process-memory-network/" target="_blank">https://www.tecmint.com/dstat-monitor-linux-server-performance-process-memory-network/</a>
                    <a href="https://stackoverflow.com/questions/43279382/bufferedreader-readline-hangs-sometimes/43282463" target="_blank">https://stackoverflow.com/questions/43279382/bufferedreader-readline-hangs-sometimes/43282463</a>
                    <a href="https://access.redhat.com/solutions/18178" target="_blank">https://access.redhat.com/solutions/18178</a>
                    <a href="http://tutorials.jenkov.com/netty/netty-tcp-client.html" target="_blank">http://tutorials.jenkov.com/netty/netty-tcp-client.html</a>
                    <a href="https://blog.fastthread.io/2016/06/06/how-to-take-thread-dumps-7-options/" target="_blank">https://blog.fastthread.io/2016/06/06/how-to-take-thread-dumps-7-options/</a>
                    <a href="https://fastthread.io/ft-index.jsp" target="_blank">https://fastthread.io/ft-index.jsp</a>
                    <a href="https://blog.tier1app.com/2014/11/26/thread-dump-analysis/" target="_blank">https://blog.tier1app.com/2014/11/26/thread-dump-analysis/</a>
                </section>

            </BlogPost>
        );
    }
}

export default P020920;
