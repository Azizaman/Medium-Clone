import {Quote} from "../Components/Quote.tsx";

import { AuthLogin } from '../Components/AuthLogin';



export function Signin() {
  

  return (
    <div className={"grid grid-cols-1 lg:grid-cols-2"}>
    <div>
        <AuthLogin/>

    </div>
    <div className={"hidden md:block"}>
        <Quote/>
    </div>

</div>
  );
}

