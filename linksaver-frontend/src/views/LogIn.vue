<template>
    <div class="row no-gutters w-100 min-vh-100" style="background-image: linear-gradient(to top,#f4516c,#716aca);">
        <div class="col-xl-4"></div>
        <div class="col-xl-4 py-auto text-center min-vh-100 ">
            <form class="py-auto align-self-center">
                <!--<img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
                <h1 class="h3 mb-5 font-weight-normal" style="margin-top: 150px; color: #ffffff;">
                    <i class="la la-bookmark"></i>
                    Readones
                </h1>
                <!--<label for="inputEmail" class="sr-only">Email address</label>-->
                <input type="email" id="inputEmail" class="form-control"
                       v-model="in_mail"
                       placeholder="Email address" required="" autofocus="">
                <span style="color: #ff0000" v-show="fail">Log in failed, incorrect username or password</span>
                <!--<label for="inputPassword" class="sr-only">Password</label>-->
                <input type="password" id="inputPassword" class="form-control mt-2"
                       v-model="in_pass"
                       placeholder="Password" required="">
                <div class="checkbox mb-3 mt-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button v-if="!loading" class="btn btn-lg btn-primary btn-block" v-on:click="signIn(in_mail,in_pass)">Sign in</button>
                <button v-else class="btn btn-lg btn-primary btn-block"
                        v-bind:disabled="true"
                        v-on:click="signIn(in_mail,in_pass)">Sign in....</button>
                <div class="mt-3">Dont have an account? <span v-on:click="SignUpForm"
                style="cursor: pointer; color: #0a8cf0">Sign Up</span></div>
            </form>
        </div>
        <div class="col-xl-4"></div>
    </div>

</template>

<script>


    import axios from 'axios'

    export default {
        name: "LogIn",
        data() {
            return {
                loading : false,
                in_mail: "",
                in_pass: "",
                fail: false,
            }
        },
        mounted() {
            if( localStorage.token){
                this.$router.push('/list');
            }
        },
        methods: {
            
            signIn(mail, pass) {
                this.loading = true ;
                let body =
                    {
                        "email": mail,
                        "password": pass,
                    };
                axios({
                    method: 'post',
                    url: 'https://api.readones.com/v1/users/authentication',
                    data: body
                }).then((response) => {
                        //this.loading = false;
                        // console.log(this.$root.email);
                        console.log(response.data);
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("email", mail);
                        location.reload();
                    }).catch((error) => {
                    if (error.response.status === 401)
                        this.fail = true;

                    console.log(error);
                    this.loading = false;
                });

            },
            SignUpForm() {
                this.$router.push('/signup');
                location.reload();

            }
        }
    }

</script>

<style>iframe#_hjRemoteVarsFrame {
    display: none !important;
    width: 1px !important;
    height: 1px !important;
    opacity: 0 !important;
    pointer-events: none !important;
}</style>
