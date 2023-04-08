
import { useState } from "react";

export default function BlurPanel ({children, animate=true, text="Expand", defaultValue=true, gap=".5rem"}) {

    const [compressed, setCompressed] = useState(defaultValue)

    return (
        <>
        
        <div style={{borderCollapse: `collapse`}}>

            <p className="expander"
                style={compressed
                    ? {}
                    : {borderRadius: `8px 8px 0px 0px`, background: `rgba(33, 33, 33, .1)`}
                }    
                onClick={() => {setCompressed(!compressed)}}>{(compressed ? "Show" : "Hide")} 
                
                {" " + text}</p>
            {!compressed && <div style={compressed 
                    ? { paddingBlock: `0`, pointerEvents: "none"}
                    : { borderRadius: `0px 8px 8px 8px`, background: `rgba(33, 33, 33, .1)`}} className="main">
                {children}
            </div> }
            
        </div>

        
        <style jsx>{`
            
            

            .main {
                border-radius: 8px;
                padding: .5rem;
                ${animate ? "animation: pop 400ms ease-in-out;" : ""}
                height: 100%;
                max-height: fit-content;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(255, 255, 255, 0.1);
                gap: ${gap}
                border-collapse: collapse;
            }
            .expander {
                transition: all 400ms ease-in-out;
                width: fit-content;
                color: white;
                background-color: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: .25rem;
                background: none;
                border-collapse: collapse;
                border-bottom: none;
            }
            
            @keyframes pop {
                0% {
                    opacity: 0;
                    max-height: 0px;
                }
                100% {
                    scale: 1;
                    opacity: 1;
                    max-height: 888px;
                }
            }

            `}</style>

        </>
    );
}