import React from "react";
import "../styles/App.css";

// import graphql and create client
import { createClient } from "urql";


// create custom client for this page where no token should exist
const client = createClient({
    url: "https://insightbox.xyz/api",
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        // check if we have a auth code in URL
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");

        // do a check for the code and check we didn't accidentally come back to this page with same code
        if (code != null && code !== localStorage.getItem("old_code")) {
            localStorage.setItem("old_code", code);
            client
                .mutation(
                    `
      mutation{
        signIn(authCode: "${code}")
      }`
                )
                .toPromise()
                .then((result) => {
                    if (result.data) {
                        if (result.data.signIn) {
                            localStorage.setItem("token", result.data.signIn);
                            console.log("token saved");
                        } else {
                            console.log("returned token blank (auth error)");
                        }
                    } else {
                        console.log("server aint up now is it");
                    }

                    window.close();
                });
        }
    }

    render() {
        return (
            <div>
                <div class="homepage-content">
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="loader1"></div>
                </div>
            </div>
        );
    }
}

export default SignIn;
