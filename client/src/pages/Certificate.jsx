import React from "react"
const Certificate = (props) =>{
    const name = props.name
    console.log(name)
    // const date = props.location.state.name
    // const organization = props.location.state.name
    // const qr = props.location.state.name
    // document.querySelector("#display-name").innerHTML = name
    return(
        <div class="container">
            <div class="logo">
                An Organization <h1 id='display-name'>Name</h1>
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                Joe Nathan
            </div>

            <div class="reason">
                For deftly defying the laws of gravity<br/>
                and flying high
            </div>
        </div>
    )
}
export default Certificate;