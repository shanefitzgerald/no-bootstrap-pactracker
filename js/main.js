$( document ).ready(function() {
    
    

var repSum = 0;
var demSum = 0;
var x = [];
var demTotalArray = [];
var repTotalArray = [];
var demTotalFromPacs = [];
var repTotalFromPacs = [];
var demTotalFromIndiv = [];
var repTotalFromIndiv = [];
var demName = [];
var repName = [];
var demNameTotal = [];
var repNameTotal = [];

    $.ajax({
        url: "http://api.nytimes.com/svc/elections/us/v3/finances/2014/candidates/leaders/pac-total.json?api-key=c353cbc0ae7d858a504f6ed663c0a326:5:69483126",
        //force to handle it as jsonp by adding 'callback='
        dataType: "jsonp",
        success: function(data1) {                   
                for (var key in data1.results) {
                    $('#pactotal').append('<tr id="' + data1.results[key].party + '">' +
                                                '<td>' + data1.results[key].name  + '</td>' + 
                                                '<td>' + data1.results[key].party + '</td>' +
                                                '<td>' + data1.results[key].total_from_pacs + '</td>' +
                                                '<td>' + data1.results[key].date_coverage_from + '</td>' +
                                                '<td>' + data1.results[key].date_coverage_to + '</td>' +
                                            '</tr>'
                                            )};

                                        // This for loop builds arrays totaling total contributions and seperates them by republican and democrat
                                        for (var key in data1.results) {
                                            if (data1.results[key].party === "DEM"){
                                            //build array of total contributions from democrats to use with highchart.js pie chart
                                            demTotalArray.push(data1.results[key].total_contributions);
                                            //build array of total contributions from pacs to use with highchart.js 3d bar chart
                                            demTotalFromPacs.push(data1.results[key].total_from_pacs);
                                            //bild array of dem names for highchart.js 3d bar chart
                                            demName.push(data1.results[key].name);
                                            } else {
                                            //build array of total contributions from republicans to use with highchart.js pie chart
                                            repTotalArray.push(data1.results[key].total_contributions);
                                            //build array of total contributions from pacs to use with highchart.js 3d bar chart
                                            repTotalFromPacs.push(data1.results[key].total_from_pacs);
                                            //bild array of rep names for highchart.js 3d bar chart
                                            repName.push(data1.results[key].name);
                                            
                                            };
                                        };

                                        // make the total donations dem array numbers and not strings 
                                        demTotalArray = demTotalArray.map(function (x) { 
                                            return parseInt(x);
                                        }); 
                                        // make the total from pacs donations dem array numbers and not strings 
                                        demTotalFromPacs = demTotalFromPacs.map(function (x) { 
                                            return parseInt(x);
                                        });
                                        // make the total donations rep array numbers and not strings
                                        repTotalArray = repTotalArray.map(function (x){
                                            return parseInt(x);
                                        });
                                        // make the total from pacs donations rep array numbers and not strings
                                        repTotalFromPacs = repTotalFromPacs.map(function (x){
                                            return parseInt(x);
                                        });

                                        // sum the array of demsTotalArray
                                        var demSum = 0;
                                        $.each(demTotalArray, function(){
                                            demSum += this;
                                        });
                                        // sum the array of repsTotalArray
                                        var repSum = 0;
                                        $.each(repTotalArray, function(){
                                            repSum += this;
                                        });

                                        x.push(
                                            ['Democrat', demSum],
                                            ['Republican', repSum]
                                            );
                                        
                                        
                                        //highcharts pie chart
                                        $(function () {
                                            Highcharts.setOptions   ({
                                                colors: ['#232066','#E91D0E'],
                                            });
                                            $('#piecontainer').highcharts({
                                                chart: {
                                                    type: 'pie',
                                                    options3d: {
                                                        enabled: true,
                                                        alpha: 45,
                                                        beta: 0,
                                                        
                                                    },
                                                    backgroundColor: 'transparent',

                                                },
                                                title: {
                                                    text: 'Scoreboard: Total Contributions to Democrats VS Repulicans'
                                                },
                                                tooltip: {
                                                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                                },
                                                plotOptions: {
                                                    pie: {
                                                        allowPointSelect: true,
                                                        cursor: 'pointer',
                                                        depth: 35,
                                                        dataLabels: {
                                                            enabled: true,
                                                            format: '{point.name}',
                                                                style: {
                                                                    color: 'black',
                                                                    fontSize: '2em',
                                                                },
                                                        },
                                                    style: {
                                                        color: 'black',
                                                    },
                                                    }
                                                },
                                                series: [{
                                                    type: 'pie',
                                                    name: 'Scoreboard',
                                                    data: x,
                                                    
                                                }]
                                            });
                                        });
                                        
                                        // 3d democrat bar chart
                                        $(function () {
                                        $('#dembarcontainer').highcharts({

                                            chart: {
                                                type: 'column',
                                                margin: 75,
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 10,
                                                    beta: 25,
                                                    depth: 70,
                                                    
                                                },
                                                backgroundColor: 'transparent',
                                            },
                                            title: {
                                                text: 'Democrat Total from PACS'
                                            },
                                            plotOptions: {
                                                column: {
                                                    depth: 25
                                                    
                                                },
                                                
                                            },
                                            xAxis: {
                                                categories: demName,
                                            },
                                            yAxis: {
                                                opposite: true
                                            },
                                            series: [{
                                                name: 'Contributions',
                                                data: demTotalFromPacs,
                                            }]
                                        });
                                    });
                                    // 3d republican bar chart
                                    $(function () {
                                        Highcharts.setOptions   ({
                                                colors: ['#E91D0E'],
                                        });
                                        $('#repbarcontainer').highcharts({

                                            chart: {
                                                type: 'column',
                                                margin: 75,
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 10,
                                                    beta: 25,
                                                    depth: 70,
                                                    
                                                },
                                                backgroundColor: 'transparent',
                                            },
                                            title: {
                                                text: 'Republicans Total from PACS'
                                            },
                                            plotOptions: {
                                                column: {
                                                    depth: 25
                                                }
                                            },
                                            xAxis: {
                                                categories: repName,
                                            },
                                            yAxis: {
                                                opposite: true
                                            },
                                            series: [{
                                                name: 'Contributions',
                                                data: repTotalFromPacs,
                                            }]
                                        });
                                    });    
                                }

            })
        
    $.ajax({
        url: "http://api.nytimes.com/svc/elections/us/v3/finances/2014/candidates/leaders/receipts-total.json?api-key=c353cbc0ae7d858a504f6ed663c0a326:5:69483126",
        //force to handle it as jsonp by adding 'callback='
        dataType: "jsonp",
        success: function(data) {                   
                for (var key in data.results) {
                    $('#twentytotal').append('<tr id="' + data.results[key].party + '">' +
                                                '<td>' + data.results[key].name  + '</td>' + 
                                                '<td>' + data.results[key].party + '</td>' +
                                                '<td>' + data.results[key].total_contributions + '</td>' +
                                                '<td>' + data.results[key].date_coverage_from + '</td>' +
                                                '<td>' + data.results[key].date_coverage_to + '</td>' +
                                            '</tr>'
                                            )};
                                }
            })
    $.ajax({
        url: "http://api.nytimes.com/svc/elections/us/v3/finances/2014/candidates/leaders/individual-total.json?api-key=c353cbc0ae7d858a504f6ed663c0a326:5:69483126",
        //force to handle it as jsonp by adding 'callback='
        dataType: "jsonp",
        success: function(data) {                   
                for (var key in data.results) {
                    $('#twentyindividualtotal').append('<tr id="' + data.results[key].party + '">' +
                                                '<td>' + data.results[key].name  + '</td>' + 
                                                '<td>' + data.results[key].party + '</td>' +
                                                '<td>' + data.results[key].total_from_individuals + '</td>' +
                                                '<td>' + data.results[key].date_coverage_from + '</td>' +
                                                '<td>' + data.results[key].date_coverage_to + '</td>' +
                                            '</tr>'
                                            )};

                                            for (var key in data.results) {
                                                if (data.results[key].party === 'DEM') {
                                                    //build array of dem total donations from individuals
                                                    demTotalFromIndiv.push(data.results[key].total_from_individuals);
                                                    demNameTotal.push(data.results[key].name);
                                                } else {
                                                    //build array of rep total donations from indiviuals
                                                    repTotalFromIndiv.push(data.results[key].total_from_individuals);
                                                    repNameTotal.push(data.results[key].name);
                                                };
                                            };
                                            // make the total donations dem array numbers and not strings 
                                            demTotalFromIndiv = demTotalFromIndiv.map(function (x) { 
                                            return parseInt(x);
                                            });
                                            // make the total donations rep array numbers and not strings 
                                            repTotalFromIndiv = repTotalFromIndiv.map(function (x) { 
                                            return parseInt(x);
                                            
                                            });

                                            console.log(repTotalFromIndiv);
                                            console.log(demTotalFromIndiv);
                                            // 3d republican bar chart
                                    $(function () {
                                        Highcharts.setOptions   ({
                                                colors: ['#E91D0E'],
                                                 backgroundColor:'rgba(255, 255, 255, 0.1)',

                                        });
                                        $('#repbarcontainertotal').highcharts({

                                            chart: {
                                                type: 'column',
                                                margin: 75,
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 10,
                                                    beta: 25,
                                                    depth: 70,
                                                    
                                                },
                                                backgroundColor: 'transparent',
                                            },
                                            title: {
                                                text: 'Republicans Total from Individuals'
                                            },
                                            plotOptions: {
                                                column: {
                                                    depth: 25
                                                }
                                            },
                                            xAxis: {
                                                categories: repNameTotal,
                                            },
                                            yAxis: {
                                                opposite: true
                                            },
                                            series: [{
                                                name: 'Contributions',
                                                data: repTotalFromIndiv,
                                            }]
                                        });
                                    });
                                    // 3d democrat bar chart
                                        $(function () {
                                            Highcharts.setOptions   ({
                                                colors: ['#232066'],
                                        
                                            });
                                        $('#dembarcontainertotal').highcharts({

                                            chart: {
                                                

                                                type: 'column',
                                                margin: 75,
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 10,
                                                    beta: 25,
                                                    depth: 70,
                                                    
                                                },
                                                backgroundColor: 'transparent',
                                                fontFamily: 'serif',
                                                color: 'black'
                                            },
                                            title: {
                                                text: 'Democrat Total from Individuals'
                                            },
                                            plotOptions: {
                                                column: {
                                                    depth: 25
                                                }
                                            },
                                            xAxis: {
                                                categories: demNameTotal,

                                            },
                                            yAxis: {
                                                opposite: true
                                            },
                                            series: [{
                                                name: 'Contributions',
                                                data: demTotalFromIndiv,

                                            }]
                                        });
                                    });
                                }
            })
    $.ajax({
            // make API call to nytimes to get most recently added commities
            url: "http://api.nytimes.com/svc/elections/us/v3/finances/2014/committees/new.json?api-key=c353cbc0ae7d858a504f6ed663c0a326:5:69483126",
            dataType: 'jsonp',
            success: function(data) {
                for (var key in data.results) {
                    if (data.results != null) {
                        // From the json display the name, treasure name, state and link to fec
                        $('#twentyNewestPacsContainer').append (
                            '<div class="pacs"><h5 id="' + data.results[key].id + '">' + data.results[key].name  + '</h5>' + 
                            '<p>Treasure: ' + data.results[key].treasurer +    '</p>' +
                            '<p>State: ' + data.results[key].state + '</p>' +
                            '<p><a href="'  + data.results[key].fec_uri + '">FEC Link</a></p>' +
                            '</div>'
                        )
                    }
                };
            }
        })
    $.ajax({
            // make API call to nytimes to get most recent SUPER PACS
            url: "http://api.nytimes.com/svc/elections/us/v3/finances/2014/committees/superpacs.json?api-key=c353cbc0ae7d858a504f6ed663c0a326:5:69483126",
            dataType: 'jsonp',
            success: function(data) {
                for (var key in data.results) {
                    if (data.results != null) {
                        // From the json display the name, treasure name, state and link to fec
                        $('#twentyNewestSuperPacsContainer').append (
                            '<div class="pacs"><h5 id="' + data.results[key].id + '">' + data.results[key].name  + '</h5>' + 
                            '<p>Treasure: ' + data.results[key].treasurer + '</p>' +
                            '<p>State: ' + data.results[key].state + '</p>' +
                            '<p><a href="'  + data.results[key].fec_uri + '">FEC Link</a></p>' +
                            '</div>'
                        )
                    }
                };

            }

        });
    setTimeout(function(){
        
        $('#twentyNewestPacsContainer').marquee( {
                direction: 'up',
                duration: 20000,
                duplicated: true,
                pauseOnHover: true,
            });
            
            $('#twentyNewestSuperPacsContainer').marquee( {
                direction: 'up',
                duration: 20000,
                duplicated: true,
                pauseOnHover: true,
            });
    },9000);

    $("#owl-carousel-table").owlCarousel({
     
          navigation : true, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem:true
     
      });

    $("#owl-carousel-graph").owlCarousel({
     
          navigation : true, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem:true
     
      });

    //change the background color and text of nav when clicked
    $('nav ul li a').click(function(event) {
    	$('nav ul li a').not($(this)).css({
    		backgroundColor: 'black',
    		color: 'white'
    	});
    	$(this).css({
    		backgroundColor: 'white',
    		color: 'black'
    	});
    });



});

