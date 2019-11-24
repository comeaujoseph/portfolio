import React, { Component } from 'react';
import { Link } from "react-router-dom";


class About extends Component {
    render () {
        return (
            <div id="about">
                <header className="about__header">
                    <Link to="/" className="icon">/</Link>
                    {/* <h1>josephthomascomeau.com</h1> */}
                </header>
                <div className="about__inner">
                    <div className="about__content">
                        Welcome to my website! My name is Joey Comeau. I am a software developer and web designer based in San Francisco, CA.
                        I use this website as my Commonplace Book, where I keep track of my learnings. I am currently interested in Java, Kubernetes,
                        Python, React, and malware analysis. I have the fortunate opportunity to work with these technologies as a lead developer
                        and architect for Barracuda Networks. Some of the most noteworthy Barracuda projects I have worked on are LinkProtect, Cloud Security Guardian,
                        and ATPaaP. In my spare time, I do web design and I am in the process of building a design system called XYZ design; you
                        can follow the project on GitHub. Outside of technology I enjoy hiking, mountain biking, and surfing. My 2019 goal is
                        to read a book month; this month I am reading Why We Sleep by Matthew Walker. Thank you for visiting.

                        <Link to="/" className="blog__link">
                            <span className="blog__link__inner">
                                <span>blog posts</span>
                                <span className="blog__link__icon">
                                    <svg width="14" height="10" viewBox="0 0 14 10">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M-1 13V-3h16v16z" />
                                            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
                                                <path d="M1 5h11.018M9 1l4 4-4 4" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </span>
                        </Link>

                        <div className="about__contact">
                            <h2>Want to work together?</h2>
                            <h1>
                                The best place to get in touch is through my email <br/> comeau.joey@gmail.com
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
