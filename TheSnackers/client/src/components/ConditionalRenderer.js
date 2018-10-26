import React, {Component} from "react";
import Home from "./Nav/Home";
import About from "./Nav/About";
import Project from "./Nav/Snacks";
import NavigationTabs from "./NavigationTabs";




class ConditionalRenderer extends Component{

    state = {
        previousPage: "Home",
        currentPage : "Home",
        shoppingCartHack : [], // #imsorrybrah #futuremewillmakeabettersolution
        dataForPageChange: {}  // #imsorrybrah #futuremewillmakeabettersolution
    };

    handlePageChange = page => {
        //alert("handlepagechange");
        this.setState ( {previousPage: this.state.currentPage} );
        this.setState ( {currentPage : page});
    };

    testfunc() {
        console.log("ConditionalRenderer.testfunc");
    }

    renderPage = () =>
    {
        {console.log("ConditionalRenderer.renderPage");}
        if(this.state.currentPage == "Home")
        {
            return <Home/>
        }
        else if(this.state.currentPage == "About")
        {
            return <About />
        }
        else if (this.state.currentPage == "Snacks")
        {
            return <Snacks />
        }
        else 
        {
            /*{console.log("ConditionalRender.renderPage: Rendering Cart");
            console.log("ConditionalRender.renderPage: previousPage, currentPage = "
                 + this.state.previousPage.toString() 
                 + this.state.currentPage.toString());}*/
            return <Cart />
        }

    }

    render(){
        return (
                <div>
                <NavigationTabs handlePageChange = {this.handlePageChange} />
                {this.renderPage()}
                </div>

        );

    }




};

export default ConditionalRenderer;