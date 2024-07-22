import {Quote} from "../Components/Quote.tsx";
import {Auth} from "../Components/Auth.tsx";

export function  Signup(){
    return(
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            <div>
                <Auth/>

            </div>
            <div className={"hidden md:block"}>
                <Quote/>
            </div>

        </div>

    )
}