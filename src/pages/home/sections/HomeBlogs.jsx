import React from 'react';
import BlogCards from '../components/BlogCards';
import "../../../styles/blog.css"
import { Link } from 'react-router-dom';

function HomeBlogs({ bgImage }) {


    return (
        <section className="overflow-hidden w-full relative py-0">
            <div className="flex w-[max-content] gap-4 animate-scroll-left">
                       {[...bgImage, ...bgImage, ...bgImage, ...bgImage].map((bg, index) => (
                        <Link target='_blank' key={index} to={bg.url} >
                            <BlogCards title={bg.title} bgimg={bg.img} date={bg.date} />
                        </Link>
                    ))}
            
            </div>
            <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-left {
            animation: scroll-left 70s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
        </section>
    );
}

export default HomeBlogs;
