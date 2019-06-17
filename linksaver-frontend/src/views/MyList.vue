<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand ml-4" style="cursor: pointer; color: #979797"
               v-on:click="$router.push('/stat')"
               v-on:mouseover="$event.currentTarget.classList.add('text-info')"
               v-on:mouseout="$event.currentTarget.classList.remove('text-info')">
                <i class="la la-angle-double-left" ></i>&nbsp;Go to Stat
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <!--<li class="nav-item active">-->
                    <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
                    <!--</li>-->
                    <!--<li class="nav-item active mr-auto">-->
                    <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
                    <!--</li>-->
                </ul>
                <ul class="navbar-nav form-inline my-2 my-lg-0">
                    <!--<li class="nav-item mr-4" style=" border-radius: 16px; background-image: linear-gradient(to top,#f4516c,#716aca);-->
           <!--text-align: center; cursor: pointer" data-toggle="modal" data-target="#addURLmodal">-->

                        <!--<i class="la la-plus" style="   width: 32px;-->
                                              <!--height: 32px;-->
                                              <!--padding-top: 6px;-->
                                              <!--font-family: LineAwesome;-->
                                              <!--font-size: 18px;-->
                                              <!--font-weight: normal;-->
                                              <!--font-style: normal;-->
                                              <!--font-stretch: normal;-->
                                              <!--line-height: normal;-->
                                              <!--letter-spacing: normal;-->
                                              <!--color: #ffffff;"></i>-->


                    <!--</li>-->

                    <li class="nav-item mr-4" style="cursor: pointer" data-toggle="collapse" data-target="#ls_search"
                        v-on:click="load_collect(cur_col_id,1)">
                        <i v-on:mouseover="$event.currentTarget.classList.add('text-danger')"
                           v-on:mouseout="$event.currentTarget.classList.remove('text-danger')"
                           class="la la-search" style="   width: 32px;
                                              height: 32px;

                                              font-family: LineAwesome;
                                              font-size: 32px;
                                              font-weight: normal;
                                              font-style: normal;
                                              font-stretch: normal;
                                              line-height: normal;
                                              letter-spacing: normal;
                                              color: #716aca;"></i>
                    </li>
                    <li class="nav-item collapse mr-4" style="cursor: pointer" id="ls_search">
                        <input v-model="search" type="text" placeholder="Enter a title">

                    </li>
                    <!--<li class="nav-item mr-4" style="cursor: pointer" >-->
                        <!--<i v-on:mouseover="$event.currentTarget.classList.add('text-danger')"-->
                           <!--v-on:mouseout="$event.currentTarget.classList.remove('text-danger')"-->
                           <!--class="la la-bell" style="   width: 32px;-->
                                              <!--height: 32px;-->

                                              <!--font-family: LineAwesome;-->
                                              <!--font-size: 32px;-->
                                              <!--font-weight: normal;-->
                                              <!--font-style: normal;-->
                                              <!--font-stretch: normal;-->
                                              <!--line-height: normal;-->
                                              <!--letter-spacing: normal;-->
                                              <!--color: #716aca;"></i>-->
                    <!--</li>-->

                    <!--<li  class=" nav-item mr-4" v-on:click="LogOut" v-bind:title="message='Log Out'"-->
                         <!--style="cursor: pointer">-->
                        <!--<img src="./images/rin.jpg" class="rounded-circle rounded-sm" style="max-width: 50px">-->
                    <!--</li>-->

                </ul>

            </div>
        </nav>

        <div class="container-fluid min-vh-100" style="background-color: #f4f5f8">
            <div class="row mr-2">
                <div class="col-md-2 min-vh-100" id="Collection">
                    <ul class="nav flex-column">

                        <li class="nav-item mt-4 mb-3">
                            <button class="btn btn-light  btn-pill btn-block"
                                    data-toggle="modal" data-target="#addCollectionModal">
                                Danh sách mới
                            </button>
                        </li>
                        <!--<li class="nav-item">-->
                            <!--<a class="nav-link mt-3 ml-4 bst" href="#" style="color: #979797"-->
                               <!--v-on:mouseover="$event.currentTarget.classList.add('text-info')"-->
                               <!--v-on:mouseout="$event.currentTarget.classList.remove('text-info')"-->
                               <!--v-on:click="load_collect(-1,1)">Đã lưu</a>-->
                        <!--</li>-->
                        <li v-for="item in collections" class="nav-item mt-3 ml-4 bst"
                            v-if="item.name != 'default'">
                            <a class="nav-link" href="#" style="color: #979797"
                               v-on:mouseover="$event.currentTarget.classList.add('text-info')"
                               v-on:mouseout="$event.currentTarget.classList.remove('text-info')"
                               v-on:click="load_collect(item.id,1)">{{item.name}}</a>
                        </li>
                    </ul>

                </div>
                <div v-if="cur_col_id != -1" class="col-md-10 min-vh-100">
                    <div class="row">
                        <div class="col-xl-3 col-lg-6 col-md-3">
                            <div class="row mt-4 ml-1" v-on="getColnameById(cur_col_id)">
                                <h4>{{cur_col_name}}</h4>
                            </div>
                            <div class="row ml-2 ml-1">
                                <span v-if="count === undefined">0 Nội dung</span>
                                <span v-else>{{count}} Nội dung</span>
                            </div>
                        </div>
                        <div class="col-xl-4">

                        </div>
                        <div class="col-xl-5 d-flex justify-content-end">
                            <button v-if="cur_col_id != -1 && cur_col_id != StorageCollectionId && cur_col_id != DefaultCollectionId"
                                    class="btn btn-light btn-pill btn-lg mt-4 mr-2"
                                    data-toggle="modal" data-target="#addURLmodal" v-on:click="set()">
                                <i class="la la-plus" style="color:#716aca;"></i>
                                <a style="color:#aaaeb8">Thêm URL</a>
                            </button>
                            <button v-if="cur_col_id != -1 && cur_col_id != StorageCollectionId && cur_col_id != DefaultCollectionId"
                                    data-toggle="modal" data-target="#editCollectModal"
                                    class="btn btn-light btn-circle btn-lg btn-icon mt-4 mr-2"
                                    style="background-color:#dfe2ea;">
                                <i class="la la-pencil" style="color:#ffffff;"></i>
                            </button>
                            <button v-if="cur_col_id != -1 && cur_col_id != StorageCollectionId && cur_col_id != DefaultCollectionId"
                                    class="btn btn-light btn-circle btn-lg btn-icon mt-4 mr-2"
                                    data-toggle="modal" data-target="#delCollectModal"
                                    style="background-color:#dfe2ea;">
                                <i class="la la-trash" style="color:#ffffff;"></i>
                            </button>

                        </div>

                    </div>
                    <div class="modal fade" id="delCollectModal" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 300px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel3">Caution!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this Collection?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button v-if="loading == false"
                                            v-on:click="del_collect()"
                                            type="button" class="btn btn-danger">Delete
                                    </button>
                                    <button v-if="loading == true" type="button"
                                            v-bind:disabled="true"
                                            class="btn btn-danger">Deleting....
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="addURLmodal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 100%">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Thêm một mục</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form class="row">
                                        <div class="col-lg-4">
                                            <!--<label for="recipient-name" class="col-form-label"></label>-->
                                            <!--<input type="text" class="form-control" id="url_name">-->
                                            <select class="form-control m-input pr-2" id="tar_col">
                                                <!--<option>Mặc định</option>-->
                                                <!--<option>-->
                                                    <!--Mặc định-->
                                                <!--</option>-->
                                                <option :key="item.id" v-for="item in collections"
                                                        v-if="item.name != 'default'">
                                                    {{item.name}}
                                                </option>
                                            </select>
                                        </div>
                                        <!--<div class="col-lg-1"></div>-->
                                        <div class="col-lg-8">
                                            <!--<label for="recipient-name" class="col-form-label"></label>-->
                                            <input type="text" class="form-control pl-2" placeholder="Điền đường dẫn"
                                                   id="url_name">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button v-if="!loading" type="button" class="btn btn-primary"
                                            v-on:click="add()">Add
                                    </button>
                                    <button v-else type="button" class="btn btn-primary disabled">Add...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="editCollectModal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 300px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle4">Chỉnh sửa danh sách</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="recipient-name" class="col-form-label">Tên danh sách:</label>
                                            <input type="text" class="form-control" id="new_col_name_edit">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button v-if="!loading" type="button" class="btn btn-primary"
                                            v-on:click="edit_collect">Lưu thay đổi
                                    </button>
                                    <button v-else type="button" class="btn btn-primary disabled">Đang lưu...</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal_edit" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 600px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle6">Sửa thư mục</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body row">
                                    <div class="col-lg-6">
                                        <select class="form-control m-input pr-2" id="tar_col_2">
                                            <option>Mặc định</option>
                                            <option :key="item.id" v-for="item in collections"
                                                    v-if="item.id !== 1">
                                                {{item.name}}
                                            </option>
                                        </select>

                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card" v-on:mouseover="show = cur.id">
                                            <div class="card-body row">
                                                <div :title="cur.url" class="col-12" style="  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%">

                                                    {{cur.url.replace('http://','').replace('https://','').split(/[/?#]/)[0]}}

                                                </div>
                                            </div>
                                            <img v-if="cur.img_link != null" :src="cur.img_link"
                                                 class="card-img card-img-top" style="height: 200px;"
                                                 v-bind:title="cur.title">
                                            <img v-else src="./images/default.png" class="card-img card-img-top"
                                                 style="height: 200px;"
                                                 v-bind:title="cur.title">
                                            <div :title="cur.description" class="card-body"
                                                 style="height: 89.3px">
                                                <p class="card-text" style="overflow: hidden;
                                            text-align: justify;
                                               text-overflow: ellipsis;
                                               display: -webkit-box;
                                                -webkit-box-orient: vertical;
                                                -webkit-line-clamp: 3; /* number of lines to show */
                                               line-height: 11px;        /* fallback */
                                               max-height: 33px;       /* fallback */">
                                                    {{cur.description}}

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button v-if="!loading" type="button" class="btn btn-primary"
                                            v-on:click="edit_url()">Lưu thay đổi
                                    </button>
                                    <button v-else type="button" class="btn btn-primary disabled">Đang lưu...</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="addCollectionModal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 300px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle1">Thêm danh sách mới</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="recipient-name" class="col-form-label">Tên danh sách</label>
                                            <input type="text" class="form-control" id="new_col_name">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button v-if="!loading" type="button" class="btn btn-primary"
                                            v-on:click="new_collect()">Add
                                    </button>
                                    <button v-else type="button" class="btn btn-primary disabled">Add...</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal_youtube" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style=" width: 600px;">
                            <div class="modal-content">

                                <div class="modal-body" style="height: 480px;">
                                    <iframe class="w-100 h-100"
                                            :src="'https://www.youtube.com/embed/' + validateYouTubeUrl(cur.url) + '?autoplay=1&enablejsapi=1'">

                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal_collect" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document" style="width: 300px">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">

                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close"><span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <div class="form-group m-form__group">
                                                <label>
                                                    Lưu trữ
                                                </label>
                                                <!--<select class="form-control m-input" id="tar_col">-->
                                                <!--<option :key="item.id" v-for="item in collections">-->
                                                <!--{{item.name}}-->
                                                <!--</option>-->
                                                <!--</select>-->
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Close
                                    </button>
                                    <!--<button type="button" class="btn btn-primary"-->
                                    <!--v-if="disable === false">-->
                                    <!--Collect-->
                                    <!--</button>-->
                                    <!--<button type="button"-->
                                    <!--class="btn m-btn btn-primary m-btn&#45;&#45;custom m-loader m-loader&#45;&#45;light m-loader&#45;&#45;left"-->
                                    <!--v-bind:disabled="true"-->
                                    <!--v-else>-->
                                    <!--Collecting....-->
                                    <!--</button>-->
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <!--<div class="col-xl-3 mt-3">-->
                        <!--<div class="card">-->
                        <!--<div class="card-body row">-->
                        <!--<div class="col-5"> google.com</div>-->
                        <!--<div class="col-7 d-flex justify-content-end">-->

                        <!--<i class="la la-level-up" style="font-size: 18px; color:#716aca; "></i>-->
                        <!--<i class="la la-trash ml-3" style="font-size: 18px; color:#716aca; "></i>-->
                        <!--<i class="la la-pencil ml-3" style="font-size: 18px; color:#716aca; "></i>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<img src="./images/love.jpg" class="card-img card-img-top" style="height: 200px">-->
                        <!--<div class="card-body" style="height: 89.3px">-->
                        <!--<p class="card-text" style="overflow: hidden;-->
                        <!--text-align: justify;-->
                        <!--text-overflow: ellipsis;-->
                        <!--display: -webkit-box;-->
                        <!-- -webkit-box-orient: vertical;-->
                        <!-- -webkit-line-clamp: 3; /* number of lines to show */-->
                        <!--line-height: 11px;        /* fallback */-->
                        <!--max-height: 33px;       /* fallback */">-->
                        <!--This is a wider card with supporting text below as a-->
                        <!--natural lead-in to additional content.-->
                        <!--This content is a little bit longer.-->
                        <!--Lorem isum-->
                        <!--</p>-->
                        <!--</div>-->
                        <!--</div>-->

                        <!--</div>-->
                        <div class="col-xl-3 col-md-6 mt-3" v-for="item in links"
                             v-bind:key="item.id" :ref="'url-card-'+item.id">
                            <div class="card" v-on:mouseover="show = item.id">
                                <div class="card-body row">
                                    <div :title="item.url" class="col-7" style="  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%">

                                        {{item.url.replace('http://','').replace('https://','').split(/[/?#]/)[0]}}

                                    </div>
                                    <div class="col-5 d-flex justify-content-end">
                                        <!--<i class="la la-level-up" v-show="item.id === show"-->
                                           <!--v-bind:title="message='Upload'"-->
                                           <!--style="font-size: 18px; color:#716aca;cursor: pointer;"></i>-->
                                        <!--<i class="la la-archive ml-2" v-bind:title="message='Store'"-->
                                           <!--style="font-size: 18px; color:#716aca;cursor: pointer;"-->
                                           <!--v-show="item.id === show"-->
                                           <!--v-on:click.capture="detail_item(item);add_collect(StorageCollectionId)"-->
                                        <!--&gt;</i>-->
                                        <i class="la la-trash ml-2"
                                           v-on:click.capture="detail_item(item)"
                                           v-bind:title="message='Delete'"
                                           v-show="item.id === show"
                                           data-toggle="modal" data-target="#modal_delete"
                                           style="font-size: 18px; color:#716aca;cursor: pointer;"
                                        ></i>
                                        <!--<i class="la la-pencil ml-2"-->
                                           <!--v-on:click.capture="detail_item(item);set2()"-->
                                           <!--v-show="item.id === show"-->
                                           <!--data-toggle="modal" data-target="#modal_edit"-->
                                           <!--v-bind:title="message='Edit'"-->
                                           <!--style="font-size: 18px; color:#716aca;cursor: pointer;"></i>-->

                                    </div>
                                </div>
                                <img v-if="validateYouTubeUrl(item.url)" :src="item.img_link"
                                     class="card-img card-img-top" style="height: 200px; cursor: pointer;"
                                     data-toggle="modal" data-target="#modal_youtube" v-bind:title="item.title"
                                     v-on:click="detail_item(item)">
                                <img v-else-if="item.img_link != null" :src="item.img_link"
                                     class="card-img card-img-top" style="height: 200px; cursor: pointer;"
                                     v-on:click="goto(item.url)" v-bind:title="item.title">
                                <img v-else src="./images/default.png" class="card-img card-img-top"
                                     style="height: 200px; cursor: pointer;"
                                     v-on:click="goto(item.url)" v-bind:title="item.title">
                                <div class="modal fade" id="modal_delete" tabindex="-1" role="dialog"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document"
                                         style="width: 300px">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel2">Caution!</h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div v-if="cur_col_id === -1 || cur_col_id === 1" class="modal-body">
                                                Are you sure you want to permanently delete this item?
                                            </div>
                                            <div v-else class="modal-body">
                                                Are you sure you want to delete this item from the current collection?
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>
                                                <button v-if="loading === false && cur_col_id === -1"
                                                        v-on:click="del_item(cur.id)"
                                                        type="button" class="btn btn-danger">Delete
                                                </button>
                                                <button v-if="loading === false && cur_col_id !== -1"
                                                        v-on:click="del_col_item(cur.id)"
                                                        type="button" class="btn btn-danger">Delete
                                                </button>
                                                <button v-if="loading === true" type="button"
                                                        v-bind:disabled="true"
                                                        class="btn btn-danger">Deleting....
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :title="item.description" class="card-body" style="height: 89.3px">
                                    <p class="card-text" style="overflow: hidden;
                                            text-align: justify;
                                               text-overflow: ellipsis;
                                               display: -webkit-box;
                                               -webkit-box-orient: vertical;
                                               -webkit-line-clamp: 3; /* number of lines to show */
                                               line-height: 11px;        /* fallback */
                                               max-height: 33px;       /* fallback */">
                                        {{item.description}}

                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>


        </div>

    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: "MyList",
        data() {
            return {
                search: "",
                URL: "https://localhost:9999",
                show: -1,
                StorageCollectionId: 0,
                DefaultCollectionId: 0,
                showCard: null,
                count: 0, //Number of item in the current collection
                links: [], //Array of links which are being shown, max 10
                count_col: 0, //Number of Collection
                collections: [], //Array of Collection
                loading: false,
                page: 1, //The current Page loaded
                cur_col_id: -1, //The Current id of the collection which is being shown
                cur_col_name: "Đã lưu gần đây",
                TargetCollectionID: 0, //The ID of the Collection of CURRENT URL

                cur: {
                    "id": 0,
                    "url":"https://github.com/ez2do/ManageUrlProject?fbclid=IwAR3CGmBoVeq0wRryuKWNns3XNKmpf2-aPk6REI0TWt3ogKgy1KkOXKvnecc",
                    "title":"ez2do/ManageUrlProject",
                    "logo_link":null,
                    "img_link":"https://avatars2.githubusercontent.com/u/30441645?s=400&v=4",
                    "description":"Contribute to ez2do/ManageUrlProject development by creating an account on GitHub.",
                    "publisher":"GitHub",
                    "collection_id":1,
                    "domain_id":1
                }

            }
        },
        methods: {
            validateYouTubeUrl(url) {
                if (url != undefined || url != '') {
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        // Do anything for being valid
                        // if need to change the url to embed url then use below line
                        // $('#videoObject').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1');
                        //console.log(url + " is youtube");
                        return match[2];
                    } else {

                        // Do anything for not being valid
                        //console.log(url + " is not youtube");
                        return 0;
                    }
                }
            },
            sortM() {
                function compareM(a, b) {
                    if (a.created_time < b.created_time)
                        return 1;
                    if (a.created_time > b.created_time)
                        return -1;
                    return 0;
                }

                this.links.sort(compareM);
            },
            sortL() {
                function compareL(a, b) {
                    if (a.created_time < b.created_time)
                        return -1;
                    if (a.created_time > b.created_time)
                        return 1;
                    return 0;
                }

                this.links.sort(compareL);
            },
            edit_collect() {
                this.loading = true;
                var name = document.getElementById("new_col_name_edit").value;
                var body = {
                    "name": name
                };
                axios({
                    method: 'put',
                    url: this.URL + '/collections/' + this.cur_col_id,
                    data: body
                }).then(r => {
                        console.log(r.status);
                        location.reload();
                        this.loading = false
                    }
                ).catch(e => console.log(e));
            },

            getColnameById(id) {
                if (id === -1 || id === 1) {
                    this.cur_col_name = "Đã lưu";
                    return;
                }
                for (var i = 0; i < this.collections.length; i += 1) {
                    if (this.collections[i].id === id) {
                        this.cur_col_name = this.collections[i].name;
                        break;
                    }
                }

            },
            goto(url) {
                window.open(url);
            },
            del_col_item() {
                this.loading = true;
                axios.delete(this.URL + '/collections/' + this.cur.collection_id + '/' + this.cur.id).then((response) => {
                    //this.loading = false;
                    console.log(response);
                    this.loading = false;
                    this.load_collect(this.cur_col_id,1);
                    $('#modal_delete').modal('hide');
                    //location.reload();
                });
            }
            ,
            load_collect(id, page) {
                this.cur_col_id = id;
                if (id == -1) {
                    axios.get(this.URL + "/links").then(response => {
                        //console.log(response.data.rows);
                        this.count = response.data.rowCount;
                        this.links = response.data.rows;
                    })
                    return;
                }
                this.page = page;
                // let AuthString = "Bearer " + this.$root.auth;
                axios.get(this.URL + "/collections/all/" + id,).then(response => {
                    this.links = [];
                    this.count = response.data.rowCount;
                    this.links = response.data.rows;
                });

            },
            async add() {
                this.loading = true;
                var link_in = document.getElementById("url_name").value;
                var link_id;
                var body = {
                    url: link_in,
                };
                await axios({
                    method: 'post',
                    url: this.URL + '/links',
                    data: body
                })
                    .then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    });


                await axios.get(this.URL + "/links").then(response => {
                    console.log(response);
                    for (var i = 0; i < response.data.rows.length; i += 1) {
                        if (response.data.rows[i].url === link_in) {
                            link_id = response.data.rows[i].id;
                        }
                    }

                })

                var name = document.getElementById('tar_col').value;
                var collection_id;
                for (var i = 0; i < this.collections.length; i += 1) {
                    if (name === 'Mặc định') {
                        collection_id = 1
                        break;
                    } else if (this.collections[i].name === name) {
                        collection_id = this.collections[i].id;
                        break;
                    }
                }

                await axios({
                    method: 'post',
                    url: this.URL + '/links/' + link_id + '/' + collection_id,
                })
                    .then((response) => {
                        this.loading = false;
                        console.log(response);
                        //location.reload();

                    })
                await this.load_collect(collection_id,1);
                $('#addURLmodal').modal('hide');
                //this.add_collect();
                //let AuthString = "Bearer " + this.$root.auth;

            },
            new_collect() {
                this.loading = true;
                var title = document.getElementById("new_col_name").value;
                var body = {
                    name: title,
                }
                axios({
                    method: 'post',
                    url: this.URL + '/collections',
                    data: body
                })
                    .then(function (response) {
                        //this.loading = false;
                        console.log(response);
                        location.reload();
                    })
            },
            async del_collect() {
                this.loading = true;
                await  axios.get(this.URL + '/collections/all/' + this.cur_col_id).then(async response => {
                    for(var i = 0 ; i < response.data.rows.length ; i += 1)
                    {
                        await axios.delete(this.URL + '/collections/' + this.cur_col_id + '/' + response.data.rows[i].id)
                    }
                })
                await axios.delete(this.URL + '/collections/' + this.cur_col_id).then(function (response) {
                    //this.loading = false;
                    console.log(response);
                    location.reload();
                });
            },
            async del_item(current_id) {
                // let AuthString = "Bearer " + this.$root.auth;
                this.loading = true;
                await axios.delete( this.URL + '/links/' + current_id).then(function (response) {
                    //this.loading = false;
                    console.log(response);
                    //location.reload();
                }).catch(response => {
                    console.log(response);
                });
                this.load_collect(-1);
                $('#modal_delete').modal('hide');
                this.loading = false;
            },
            detail_item(target) {
                this.cur = target;
//                 var t = target.created_time;
//                 var date = new Date(t * 1000);
//                 console.log(t);
// // Hours part from the timestamp
// // var hours = date.getHours();
// // // Minutes part from the timestamp
// // var minutes = "0" + date.getMinutes();
// // // Seconds part from the timestamp
// // var seconds = "0" + date.getSeconds();
//
// // Will display time in 10:30:23 format
// // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//                 this.cur.created_time = date;
//                 target.created_time /= 1000;
            },
            LogOut() {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                location.reload();
                //this.$router.push('/login');
            },
            set2() {
                var col = document.getElementById('tar_col_2');
                for(var i = 0; i < this.collections.length ; i += 1)
                {
                    if (this.collections[i].id === this.cur.collection_id){
                        col.selectedIndex = i;
                        return;
                    }
                }

            },
            set() {
                var col = document.getElementById('tar_col');
                for (var i = 0; i < this.collections.length; i += 1) {
                    if (this.collections[i].id === this.cur_col_id) {
                        col.selectedIndex = i - 1;
                        break;
                    }
                }
            },
            async edit_url() {
                this.loading = true;
                var name = document.getElementById('tar_col_2').value;
                var id;
                if ( name === 'Mặc định')
                {
                    id = 1;
                }
                else {
                    for (var i = 0; i < this.collections.length; i += 1) {
                        if (this.collections[i].name === name) {
                            id = this.collections[i].id;
                            break;
                        }
                    }
                }
                var body = {
                    collection_id: id,
                }

                //Add the URL to new collection
                await axios({
                    method: 'post',
                    url: this.URL + '/links/' + this.cur.id + '/' + id
                })
                    .then((response) => {
                        this.loading = false;
                        console.log(response);
                        if( id === 1)
                            this.load_collect(-1,1);
                        else
                            this.load_collect(id,1);
                        $('#modal_edit').modal('hide');
                        //location.reload();
                    })
            }
        },
        watch: {
            search : async function () {
                // if (this.searchdata === "")
                // {
                //     this.load_collect(this.cur_col_id,1);
                //     return;
                // }
                // if (newsearch.length < oldsearch.length) {
                //     await this.load_collect(this.cur_col_id, 1);
                // }

                this.count = this.links.length;
                for(var i = 0; i < this.links.length; i += 1){

                    //this.links.splice(i,1);
                    this.$refs['url-card-' + this.links[i].id][0].classList.remove('d-none');
                    // this.count -= 1;

                }

                for(i = 0; i < this.links.length; i += 1){
                    // var string = this.links[i].preview.title;
                    //console.log(this.links[i].title);
                    // var index = string.toLowerCase().indexOf(this.searchdata);
                    if(this.links[i].title.toLowerCase().indexOf(this.search) === -1
                        && this.links[i].description.toLowerCase().indexOf(this.search) === -1
                        && this.links[i].url.toLowerCase().indexOf(this.search) === -1) {
                        //this.links.splice(i,1);
                        this.$refs['url-card-'+this.links[i].id][0].classList.add('d-none');
                        this.count -= 1;
                    }
                }
            }
        },
        computed: {
            disable() {
                return this.loading;
            }
        },
        async mounted() {
            // if( !localStorage.token) {
            //     this.$router.push('/login');
            // }

            // let AuthString = "Bearer " + this.$root.auth;
            window.document.title = "My List";
            await axios.get(this.URL + "/links").then(response => {
                //console.log(response.data.rows);
                this.count = response.data.rowCount;
                this.links = response.data.rows;
            })

            await axios.get(this.URL + "/collections").then(response => {
                this.collections = response.data.rows;
                this.count_col = response.data.count;
            }).catch((error) => {
                if (error.status === 401) {
                    this.LogOut();
                }
            });

        }
    }
</script>


<!--<script src="../assets/vendors/base/vendors.bundle.js" type="text/javascript"></script>-->
<!--<script src="../assets/demo/default/base/scripts.bundle.js" type="text/javascript"></script>-->
<!--&lt;!&ndash;<script src="../assets/vendors/custom/fullcalendar/fullcalendar.bundle.js" type="text/javascript"></script>&ndash;&gt;-->
<!--<script src="../assets/app/js/dashboard.js" type="text/javascript"></script>-->

<style>
    .modal-open {
        padding-right: 0px !important;
    }

    .bst {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
    }

    a:hover {
        color: #f6f6f6;
    }
</style>

