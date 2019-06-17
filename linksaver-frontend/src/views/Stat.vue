<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" style="cursor: pointer; color: #979797"
               v-on:click="$router.push('/list')"
               v-on:mouseover="$event.currentTarget.classList.add('text-info')"
               v-on:mouseout="$event.currentTarget.classList.remove('text-info')">
                <i class="la la-angle-double-left" ></i>&nbsp;Go to My List
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class='container-fluid mt-1'>
            <div class='row'>
                <div class="col-lg-12" style="font-size: 20px; color: #716aca">
                    Internet Usage Statistic
                </div>
                <div class='col-lg-3 mt-4' style="height: 100px">
                    <select class="browser-default custom-select custom-select-md mb-3" id='choose-attr1'>
                        <option value="duration">Duration</option>
                        <option value="visitCount">Visit Count</option>
                        <option value="networkTraffic">Network traffic</option>
                    </select>
                </div>
                <div class='col-lg-2 pl-0 mt-4' style="height: 100px">
                    <select class="browser-default custom-select custom-select-md mb-3" id='choose-range1'>
                        <option value="today">Today</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                    </select>
                </div>
                <div class="col-lg-2 pl-0 mt-4" style="height: 100px">
                    <button type="button" class="btn btn-primary btn-block" v-on:click="getData">Show data</button>
                </div>
                <div class="col-lg-5 pl-5 row mt-4" style="height: 100px">
                    <div class="col-lg-3">

                        <img v-if="domainImg !== '' && domainImg !== null" class="img-fluid img-thumbnail" alt="Responsive image" :src="domainImg">
                    </div>
                    <div class="col-lg-9">
                        {{domainTitle}}<br>
                        {{domainInfo}}<br>
                        {{domainDescription}}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 mt-3" id="chart-1-container">
                    <canvas id="DonutChart"></canvas>
                </div>
                <div class="col-lg-4">
                    <table class="table" id="doughnutTable">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Domain</th>
                            <th scope="col" v-if="attr1==='visitCount'">Visit</th>
                            <th scope="col" v-if="attr1==='duration'">Duration</th>
                            <th scope="col" v-if="attr1==='networkTraffic'">Network Usage</th>
                        </tr>
                        </thead>
                        <tbody id="table-body" style="font-weight: normal!important;">
                        <tr v-for="(item,index) in dataArray"
                            v-on:click="getWeeklyData(item.name)"
                            v-on:mouseover="$event.currentTarget.classList.add('text-info')"
                            v-on:mouseout="$event.currentTarget.classList.remove('text-info')"
                            style="cursor: pointer">
                            <th scope="row" >{{index + 1}}</th>
                            <th>{{item.name}}</th>
                            <th v-if="attr1==='duration'">{{convertDuration(item.sum)}}</th>
                            <th v-else-if="attr1==='visitCount'">{{item.sum}}</th>
                            <th v-else>{{convertTraffic(item.sum)}}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-5 mt-3 row" id="chart-2-container">
                    <canvas class="col-lg-12" id="BarChart"></canvas>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Stat",
        data() {
            return {
                backgroundColor : ["#2fc32f", "#b0dc0b", "#eab404", "#de672c", "#ec2e2e", "#d5429b", "#6f52b8", "#1c7cd5", "#56b9f7", "#0ae8eb"],
                attr1 : 'duration',
                range1 : 'today',
                host : 'https:localhost:9999',
                dataArray : [],
                domainInfo: '',
                domainTitle: '',
                domainDescription: '',
                domainImg : '',
            }
        },
        methods: {
            convertTraffic(value) {
                if (value > Math.pow(1024, 4)) {
                    return (value / Math.pow(1024, 4)).toFixed(2) + ' tb';
                } else if (value > Math.pow(1024, 3)) {
                    return (value / Math.pow(1024, 3)).toFixed(2) + ' gb';
                } else if (value > Math.pow(1024, 2)) {
                    return (value / Math.pow(1024, 2)).toFixed(2) + ' mb';
                } else if (value > Math.pow(1024, 1)) {
                    return (value / Math.pow(1024, 1)).toFixed(2) + ' kb';
                } else {
                    return value + ' byte'
                }
            },

            convertDuration(value) {
                if (value > 3600) {
                    return parseInt(value / 3600) + 'hr' + (value % 3600 % 60) + 'min';
                } else if (value > 60) {
                    return parseInt(value / 60) + 'min' + (value % 60) + 'sec';
                } else if (value >= 0) {
                    return value + ' sec';
                }

            },
            getSelectedOption(selector) {
                return selector.options[selector.selectedIndex].value;
            },
            getData() {
                var ref = this;
                this.domainDescription = '';
                this.domainTitle = '';
                this.domainInfo = '';
                this.domainImg = '';
                var attrSelector = document.getElementById('choose-attr1');
                this.attr1 = this.getSelectedOption(attrSelector);
                var rangeSelector = document.getElementById('choose-range1');
                this.range1 = this.getSelectedOption(rangeSelector);
                if (ref.range1 == 'today') {
                    //handle today data
                    // The ID of the extension we want to talk to.
                    var editorExtensionId = "jhahjaodknflcmmjkmjpfijadflngmgh";
                    var domains = [];
                    // Make a simple request:
                    chrome.runtime.sendMessage(editorExtensionId,{greeting: "hello"},
                        function (response) {
                            // console.log(response);
                            domains = response;
                            if ( ref.attr1 === 'visitCount') domains.sort((a,b) =>{a.visit < b.visit ? 1 : -1});
                            else if (ref.attr1 === 'duration') domains.sort((a,b) =>{a.duration < b.duration ? 1 : -1});
                            else domains.sort((a,b) =>{a.networkTraffic < b.networkTraffic ? 1 : -1});

                            ref.dataArray = domains.map(obj => {
                                var newObj = {};
                                newObj.name = obj.name;
                                if (ref.attr1 === 'visitCount') newObj.sum = obj.visit;
                                else if (ref.attr1 === 'duration') newObj.sum = obj.duration;
                                else newObj.sum = obj.networkTraffic;
                                return newObj;
                            });
                            var others = {name: 'others', sum: 0};
                            for (let item of ref.dataArray.slice(9)) {
                                others.sum += item.sum;
                            }
                            //ref.dataArray = rows.slice(0, 9);
                            ref.dataArray.splice(9);
                            ref.dataArray.push(others);

                            ref.showData(ref.dataArray);
                        });
                    return;
                }
                this.sendRequest(`${this.host}/daily_domains/${this.attr1}/${this.range1}`);
            },
            getSec(sum) {
                let totalSec = 0;
                if (sum.hours) totalSec += 3600 * sum.hours;
                if (sum.minutes) totalSec += 60 * sum.minutes;
                if (sum.seconds) totalSec += sum.seconds;
                return totalSec;
            },
            sendRequest(url) {
                var ref = this;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    let result = JSON.parse(this.responseText);
                    // console.log(result);
                    if (result.success === false) {
                        //handle error
                        alert('Some error occur when getting data');
                        return;
                    }
                    if (result.rowCount === 0) {
                        alert('There is no data');
                        return;
                    }

                    //if sum is not integer
                    if (!Number.isInteger(Number.parseInt(result.rows[0].sum))) {
                        //maping result.rows
                        var rows = result.rows.map(obj => {
                            var newObj = {};
                            newObj.name = obj.name;
                            newObj.sum = ref.getSec(obj.sum);
                            return newObj;
                        });
                    } else {
                        var rows = result.rows.map(obj => {
                            var newObj = {};
                            newObj.name = obj.name;
                            newObj.sum = Number.parseInt(obj.sum);
                            return newObj;
                        })
                    }
                    rows = rows.sort((a, b) => (a.sum < b.sum ? 1 : -1));
                    // console.log('Rows:', rows);

                    //receive data successfully
                    if (result.rowCount <= 10) {
                        //get data normally
                        ref.dataArray = rows;
                    } else {
                        //get first 10 most valued rows, get all other rows to other
                        var others = {name: 'others', sum: 0};
                        for (let item of rows.slice(9)) {
                            others.sum += item.sum;
                        }
                        ref.dataArray = rows.slice(0, 9);
                        ref.dataArray.push(others);
                    }
                    // console.log(ref.dataArray);
                    ref.showData(ref.dataArray);
                });
                xhr.open('GET', url);
                xhr.send();
            },
            colorTable(url, color) {
                let ChildTable = document.getElementById('table-body').childNodes;
                // console.log(ChildTable);
                for (var i = 0; i < ChildTable.length; i += 1) {
                    if (ChildTable[i].textContent.indexOf(url) !== -1) {
                        // console.log("color");
                        ChildTable[i].textContent;
                        ChildTable[i].style.color = color;
                    }
                }
            },

            resetColorTable() {
                let ChildTable = document.getElementById('table-body').childNodes;
                // console.log(ChildTable);
                for (var i = 0; i < ChildTable.length; i += 1) {
                    ChildTable[i].style.color = "#000000";
                }
            },
            showData(dataArray) {
                var ref = this;
                document.getElementById('DonutChart').remove();
                document.getElementById('BarChart').remove();
                var ctx = document.createElement('canvas');
                ctx.setAttribute('id', 'DonutChart');
                document.getElementById('chart-1-container').appendChild(ctx);
                var barC = document.createElement('canvas');
                barC.setAttribute('id', 'BarChart');
                document.getElementById('chart-1-container').appendChild(barC);

                var domains = dataArray.map(obj => {
                    return obj.name
                });
                var sums = dataArray.map(obj => {
                    return obj.sum
                });

                //Set Up Doughnut
                var data = {
                    type: 'doughnut',
                    data: {
                        labels: domains,
                        datasets: [{
                            data: sums,
                            backgroundColor: this.backgroundColor,
                            hoverBackgroundColor: []
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        responsive: true,
                        onHover(event,item) {
                            ref.resetColorTable();
                            if (item[0]) {
                                var label = item[0]['_model'].label;
                                var color = item[0]['_model'].backgroundColor;
                                ref.colorTable(label,color);
                            }
                        }
                    }
                };

                let ctxD = document.getElementById("DonutChart").getContext('2d');
                let myDoughnutChart = new Chart(ctxD,data);
                // let myDoughnutChart = new Chart(ctxD, {
                //     type: 'doughnut',
                //     data: data,
                //     option: option,
                // });
            },
            getDayFromIdiot(str){
                // let dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                const time = new Date(str.substring(0,4),str.substring(8,10) + 1, str.substring(5,7), 0, 0 , 0, 0);
                return time.getDay()
                // return dayArray[time.getDay()];
            },
            getWeeklyData(url){
                this.domainDescription = '';
                this.domainTitle = '';
                this.domainInfo = '';
                this.domainImg = '';
                var ref = this;
                // this.domainInfo =
                var link = {
                    "domain" : url,
                };
                axios({
                    method: 'post',
                    url: this.host + '/domains/get_info',
                    data: link
                }).then((res)=>{
                    ref.domainInfo =  res.data.rows[0].name;
                    ref.domainTitle = res.data.rows[0].title;
                    ref.domainDescription = res.data.rows[0].description;
                    ref.domainImg = res.data.rows[0].img_link;
                }).catch((e) =>{

                })


                var body = {
                    "domain": url,
                    "attribute": ref.attr1,
                };
                axios({
                    method: 'post',
                    url: ref.host + '/daily_domains/weekly',
                    data: body
                }).then((response) => {
                    //ref.getDayFromIdiot(response.data.rows[0].date);
                    let dataArray = response.data.rows;
                    let rows = [];
                    if ( body.attribute === 'duration') {
                        //maping result.rows
                        rows = dataArray.map(obj => {
                            var newObj = {};
                            newObj.date = ref.getDayFromIdiot(obj.date);
                            newObj.sum = ref.getSec(obj.duration);
                            return newObj;
                        });
                    }
                    else if ( body.attribute === 'visitCount'){
                        rows = dataArray.map(obj => {
                            var newObj = {};
                            newObj.date = ref.getDayFromIdiot(obj.date);
                            newObj.sum = obj.visitcount;
                            return newObj;
                        })
                    }
                    else if ( body.attribute === 'networkTraffic'){
                        rows = dataArray.map(obj => {
                            var newObj = {};
                            newObj.date = ref.getDayFromIdiot(obj.date);
                            newObj.sum = obj.networktraffic;
                            return newObj;
                        })
                    }
                    ref.showWeeklyData(rows);
                })
            },
            showWeeklyData(dataArray){
                var ref = this;
                document.getElementById('BarChart').remove();
                var ctx = document.createElement('canvas');
                ctx.setAttribute('id', 'BarChart');
                document.getElementById('chart-2-container').appendChild(ctx);

                //Data Set Up
                let data = [];
                for (var i = 0; i < 7; i += 1){
                    data[i] = 0;
                }
                for (var i = 0; i < dataArray.length; i += 1){
                    data[dataArray[i].date] = dataArray[i].sum;
                }


                //Style SetUp
                var X;
                var d = new Date();
                let wDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
                wDay[d.getDay()] = "Today";

                //Reverse
                let dataBar = [];
                let labelBar = [];
                i = d.getDay();
                let init = i;
                let j = 0;
                while (1) {
                    i += 1;
                    if (i === 7) i = 0;
                    dataBar[j] = data[i];
                    labelBar[j] = wDay[i];
                    if (i === init) break;
                    j += 1;
                }

                // console.log(ref.attr1);
                if (ref.attr1 === 'duration') X = 'sec';
                else if (ref.attr1 === 'visitCount') X = 'visit';
                else X = 'byte';

                //Bar Chart
                var ctxB = document.getElementById("BarChart").getContext('2d');
                var myBarChart = new Chart(ctxB, {
                    type: 'bar',
                    data: {
                        labels: labelBar,
                        datasets: [{
                            label: this.attr1 + ' (' + X + ')',
                            data: dataBar,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(231, 20, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(231, 20, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });


            }
        },
        mounted() {
            window.document.title = "My Stat";
        }

    }
</script>

<style scoped>
    th {
        font-weight: normal;
    }

</style>