import React from 'react';
import "./styles.css";
// import { Loader } from '../components/profile';
import { getRandom, shuffleArray, SmartImageComponent } from '../components/misc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const text="Hello Expats Elite Singles. I'm interested in your service. Kindly advise on how to proceed.".split(' ').join('%20')
const whatsapp = "https://api.whatsapp.com/send/?phone=19088971181&text="+text+"+&type=phone_number";

const imageobjectcss =  {
    maxWidth: "150px",
    height: "15rem",
    padding: "0 15px",
    objectFit: "cover"
}

const Banner = ({ images, speed = 0, linkitems, isempty }) => {
    const navigate = useNavigate()

    function loginpleasefunction() {
        navigate('/loginplease')
    }

    console.log(linkitems)

    if (isempty) {
        return (
            // <div className="w-11/12 overflow-x-hidden">
            <div className="w-11/12 flex flex-row overflow-x-auto justify-center">
                <section style={{ "--speed": `${speed}ms` }}>
                  {images.map(({ id, image }) => (
                    <div className="image" key={id}>
                      <img src={image} alt={id} />
                    </div>
                  ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                  {images.map(({ id, image }) => (
                    <div className="image" key={id}>
                      <img src={image} alt={id} />
                    </div>
                  ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                  {images.map(({ id, image }) => (
                    <div className="image" key={id}>
                      <img src={image} alt={id} />
                    </div>
                  ))}
                </section>
              </div>
            // </div>
          );
    } else {
        return (
            // <div className=" overflow-x-hidden">
              <div className="w-11/12 flex flex-row overflow-x-auto justify-center" onClick={() => loginpleasefunction()}>
                <section style={{ "--speed": `${speed}ms` }}>
                    {linkitems.map(({ id, item }) => (
                        <div className="image" key={id}>
                            <SmartImageComponent src={item.link} id={id} imageobjectcss={imageobjectcss}/>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {linkitems.map(({ id, item }) => (
                        <div className="image" key={id}>
                            <SmartImageComponent src={item.link} id={id}/>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {linkitems.map(({ id, item }) => (
                        <div className="image" key={id}>
                            <SmartImageComponent src={item.link} id={id}/>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {linkitems.map(({ id, item }) => (
                        <div className="image" key={id}>
                            <SmartImageComponent src={item.link} id={id}/>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {linkitems.map(({ id, item }) => (
                        <div className="image" key={id}>
                            <SmartImageComponent src={item.link} id={id}/>
                        </div>
                    ))}
                </section>
              </div>
            // </div>
          );
    }
};
  
export default function IndexPage() {
    const [loading, setLoading] = React.useState(true)
    const [empty, setIsEmpty] = React.useState(false)
    const [linkitems, setLinkItems] = React.useState([])
    const [startscroll, setStartScroll] = React.useState(false)


    return (
        <>
            <header id="main" class="flex flex-row justify-between mb-2 mt-0">
                <a href='/'>
                    <img class="img-fluid h-20" src="/assets/img/logo.jpeg"/>
                </a>
            </header>

            <main class="flex flex-row justify-center mx-6 overflow-x-hidden mb-2">
                <a class="w-1/3 py-2 m-1 px-4 bg-gradient-to-r from-indigo-400 to-cyan-400 text-black text-xs text-center md:text-xl font-bold flex items-center justify-center" href="/html/authcode.html">
                    <p>SIGNUP</p>
                </a>
                <a class="w-1/3 py-2 m-1 px-4 bg-gradient-to-r from-teal-400 to-gray-800 text-white text-xs text-center md:text-xl font-bold flex flex-col items-center justify-center" href={whatsapp}>
                    <i class="fa-brands fa-whatsapp"></i>
                    <p class="mt-1">TALK TO US</p>
                </a>
                <a class="w-1/3 py-2 m-1 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs text-center md:text-xl font-bold flex items-center justify-center" href="/login">
                    <p>LOGIN</p>
                </a>
            </main>

            <div className="App mx-10 overflow-x-hidden">
            </div>

            <div class="m-2 flex flex-row items-center justify-center md:px-10 w-full overflow-x-hidden">
                <a class="w-1/4 p-3 m-2 h-32 w-full bg-gradient-to-r from-purple-500 to-purple-900 text-white text-sm md:text-xl font-bold text-center flex items-center justify-center" href="/howitworks">
                    <p>HOW<br/>IT<br/>WORKS</p>
                </a>
                <a class="w-1/4 p-3 m-2 h-32 w-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-sm md:text-xl font-bold text-center flex items-center justify-center" href="/alltestimonials">
                    <p>REVIEWS</p>
                </a>
                <a class="w-1/4 p-3 m-2 h-32 w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-sm md:text-xl font-bold text-center flex items-center justify-center" href="/faq">
                    <p>FAQ'S</p>
                </a>
            </div>

            <footer id="footer" class="m-2 overflow-x-hidden">
                <p class="w-full text-xs uppercase text-white font-normal text-center">Copyright © 2017</p>
            </footer>
        </>
    )
}