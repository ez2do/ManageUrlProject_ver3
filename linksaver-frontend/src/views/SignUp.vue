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

                <input type="email" id="inputEmail" class="form-control"
                       v-model="up_mail"
                       placeholder="Email address" required="" autofocus="">

                <input type="password" id="inputPassword" class="form-control mt-2"
                       v-model="up_pass"
                       placeholder="Password" required="">

                <input type="password" class="form-control mt-2"
                       v-model="up_conf"
                       placeholder="Confirm Password" required="">
                <div class="checkbox mb-3 mt-3">

                </div>
                <div class="row">
                    <div class="col-xl-6"><button class="btn btn-lg btn-secondary btn-block" v-on:click="signInForm()">Cancel</button></div>
                    <div class="col-xl-6"><button class="btn btn-lg btn-primary btn-block" v-on:click.prevent="signUp()">Sign Up!</button></div>
                </div>
            </form>
        </div>
        <div class="col-xl-4"></div>
    </div>


    <!--<div>-->
    <!--<input v-model="up_mail">-->
    <!--<input v-model="up_pass" type="password">-->
    <!--<input v-model="up_conf" type="password">-->
    <!--<button class="btn btn-lg btn-primary" v-on:click="signUp(up_mail,up_user,up_pass,up_conf)">Sign Up!</button>-->
    <!--</div>-->

</template>

<script>


    import axios from 'axios'

    export default {
        name: "SignUp",
        data() {
            return {
                up_mail: "",
                up_user: "default",
                up_pass: "",
                up_conf: "",
            }
        },
        mounted() {
            // if(localStorage.token){
            //     this.$router.push('/list');
            // }
        },
        methods: {
            signInForm() {
                this.$router.push('/login');
            },
            signUp() {
                let body =
                    {
                        "email": this.up_mail,
                        "username": this.up_user,
                        "password": this.up_pass,
                        "confirm_password": this.up_conf
                    }
                axios({
                    method: 'post',
                    url: 'https://api.readones.com/v1/users',
                    data: body
                })
                    .then(function (response) {
                        //this.loading = false;
                        console.log(response);
                        //toastr.success("New account created successfully");
                    })
                    .catch((error) => {
                        if (error.response.status == 400) {
                            //toastr.error("This email has already exist!");
                        } else {
                            //toastr.error("Unexpected Error!, ");
                        }
                    })

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
