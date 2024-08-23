import React from 'react';
import Category from "../components/category";
import About from "../components/about";
import Services from "../components/services";
import Colors from "../components/colors";
import Blogs from "../components/blogs";
import Joinhome from "../components/joinhome";

export default function Homepage() {
    return (
        <div className="border-l-8 border-red-500 ">        {/* on click on nav link show specific content  */}
            <section id="about"> <About /> </section>
            <section id="category" > <Category /> </section>
            <section id="services"> <Services /> </section>
            <section id="colors">  <Colors /> </section>
            <section id="become-a-dealer"> <Joinhome /> </section>
            <section id="blogs"> <Blogs /> </section>
            <section id="contact"> </section>
            <section id="enquire"> </section>
        </div>
    );
}
