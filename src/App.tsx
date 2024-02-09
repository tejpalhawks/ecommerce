import React, { useEffect } from 'react';
import Routes from './routes/Routes';
// import Routes2 from './routes2/index';

import { configureFakeBackend } from './helpers';
import './assets/scss/Default.scss';
import './assets/scss/stylenew.scss';

import { ProjectDetails } from './helpers/api/APIs';



require('dotenv').config()



configureFakeBackend();

function getFaviconEl() {
    return document.getElementById("favicon") as HTMLLinkElement | null;;
  }



const App = () => {

    // const[projectDetail,setProjectDetail] = useState()
    // const[TabTitle,setTabTitle] = useState()

    useEffect(()=>{
        ProjectDetails()
            .then(data => {
                // setProjectDetail(data);
                // setTabTitle(data.seo_content.customer_title)
                document.title = data.seo_content.customer_title + " : " + data.seo_content.customer_meta_description;
                const favicon = getFaviconEl(); // Accessing favicon element
                if(favicon){
                    favicon.href = data.website_favicon;
                }
            })
            .catch(error => {
                console.error(error);
            });
        
            const checkImageInLocalStrg = localStorage.getItem("image")
            if(checkImageInLocalStrg){
            localStorage.removeItem("image")
        }

    },[])

    

    

    return (
        <>
            <Routes></Routes>
            {/* <Routes2></Routes2> */}
        </>
    );
};

export default App;
