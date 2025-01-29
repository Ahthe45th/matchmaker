import React from 'react';
import axios from 'axios';

// Define the first React component
export default function MenComponent() {
    const [loading, setLoading] = React.useState(true)
    const [empty, setIsEmpty] = React.useState(false)
    const [linkitems, setLinkItems] = React.useState([])

    const shuffleArray = (array) => {
        const newArray = [...array]; // Create a copy of the array to avoid mutating the original
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    React.useEffect(function () {
        axios.get("/api/getmenfiles").then((response)=>{
            console.log("Response:", response)
            if (response.data.images.length !== 0) {
                console.log("The Response:", response)
                setLinkItems(response.data.images)
                setLoading(false)
            } else {
                console.log("The Response:", response)
                setLinkItems(response.data.images)
                setLoading(false)
                setIsEmpty(true)
            }
        })
    }, [])

    React.useEffect(() => {
        // Initial shuffle when the component mounts
        // Set up the interval to shuffle every 30 seconds (30000 milliseconds)
        const intervalId = setInterval(() => {
          setLinkItems(shuffleArray(linkitems));
        }, 3000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [linkitems]);

    return (
        <div class="grid grid-cols-2 md:grid-cols-3 gap-1 place-items-center">
            {loading
                ? null
                : <>
                    {empty
                        ? <p class="text-white text-base">No men just yet.</p>
                        : <>
                            {linkitems.map((item) => (
                                <a href="/login">
                                    <img class="img-fluid" src={item.link}/>
                                </a>
                            ))}
                          </>
                    }
                  </>
            }
        </div>
    )
}