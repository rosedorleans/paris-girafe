

let projet = window.location.pathname.split("index.php")[0].split('/')[window.location.pathname.split("index.php")[0].split('/').length - 2]
let serverURL = window.location.protocol + "//" + window.location.host + window.location.pathname.split("index.php")[0].split(projet)[0] +"/" ;
console.log('serverURL:', serverURL)

$(document).ready( async function () {
    createNav()
    
    await $.ajax({	
        url : 'http://localhost/projets-perso/paris-girafe/index.php/bet/',
        type : 'GET',
        success : function(response){
            console.log(response);

            $.each(response.data, function( key, bet ) {
                console.log('bet:', bet)

                let statutName = getStatutName(bet.statut)

                $('#homePage ul').append(
                    '<li class="bet-elem">'+
                        '<h2>'+bet.name+'</h2>'+
                        '<p>'+bet.description+'</p>'+
                        '<span class="statut '+statutName+'">'+statutName+'</span>'+
                        '<span class="showBet_js" data-id="'+bet.id+'">'+
                            '<svg width="30px" height="30px" viewBox="0 -5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-340.000000, -6564.000000)" fill="#000000"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M298.803134,6405.67805 L300.227463,6407.16201 C300.5321,6407.48143 300.304126,6407.99811 299.861293,6407.99811 L284.834221,6407.99811 C284.277401,6407.99811 284,6408.4477 284,6409.00043 L284,6408.99242 C284,6409.54515 284.277401,6410.00075 284.834221,6410.00075 L299.846162,6410.00075 C300.291013,6410.00075 300.517977,6410.54047 300.209306,6410.85788 L298.793047,6412.31781 C298.409729,6412.71634 298.426877,6413.35218 298.833396,6413.72867 L298.835413,6413.73268 C299.236888,6414.10517 299.866337,6414.08614 300.244611,6413.68962 L303.449351,6410.34721 C304.186734,6409.57219 304.182699,6408.36059 303.44229,6407.58957 L300.265794,6404.30724 C299.888529,6403.91472 299.264124,6403.8957 298.863658,6404.26518 L298.85357,6404.2752 C298.44806,6404.64869 298.425868,6405.27752 298.803134,6405.67805" id="arrow_right-[#365]"></path></g></g></g></svg>'+
                        '</span>'+
                    '</li>'
                )
            })
        }
    });

    $('.showHome_js').off("click")
    $('.showHome_js').on("click", function(e){
        changeView('homePage')
    })

    $('.newBet_js').off("click")
    $('.newBet_js').on("click", function(e){
        changeView('newBetPage')
    })

    $('.showBet_js').off("click")
    $('.showBet_js').on("click", function(e){
        changeView('showBetPage')
        let betId = $(this).data('id')

        $.ajax({	
            url : 'http://localhost/projets-perso/paris-girafe/index.php/bet/'+betId,
            type : 'GET',
            success : function(response){
                let bet = response.data
                console.log('bet:', bet)

                let statutName = getStatutName(bet.statut)

                $('#showBetPage .bet-show').append(
                    '<div class="bet-elem">'+
                        '<h2>'+bet.name+'</h2>'+
                        '<p>'+bet.description+'</p>'+
                        '<p class="statut '+statutName+'">'+statutName+'</p>'+
                        '<span class="showBet_js" data-id="'+bet.id+'">'+
                            '<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
                        '</span>'+
                        '<ul class="votes-list"></ul>'+
                    '</div>'
                )
                
            }
        });

        $.ajax({
            url : 'http://localhost/projets-perso/paris-girafe/index.php/vote/getVotesByBetId?betId='+betId,
            type : 'GET',
            success : function(response){

                console.log(response.data)
                if(response.data){
                    $.each(response.data, function( key, vote ) {
    
                        $('#showBetPage .votes-list').append(
                            '<li class="vote-elem">'+
                                '<p>'+vote.date+'</p>'+
                                '<p>'+vote.user_id+'</p>'+
                            '</li>'
                        )
                    })
                } else {
                    $('#showBetPage .votes-list').append(
                        '<li class="no-vote">Personne n\'a encore voté !</li>'
                    )
                }
            }
        })
    })

    $('.showUser_js').off("click")
    $('.showUser_js').on("click", function(e){
        changeView('showUserPage')
    })
})

function changeView(newView){
    $('.page-content').addClass('hidden')
    $('#'+newView).removeClass('hidden')
    $('#homePage ul').empty()
}

function getStatutName(statutId){
    switch (statutId) {
        case "1":
            return "ouvert"
        case "2":
            return "terminé"
        case "3":
            return "archivé"
        default:
            return ""
    }
    
}


function createNav(){
    $('header').html(
        `<h1>
            <span>Paris <br> G</span>
                <svg height="120px" width="120px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 424.94 424.94" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00424938" transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path style="fill:#ebb800;" d="M179.741,271.091l-6.632,151.666c0,1.205-0.975,2.18-2.18,2.18h-19.673 c-1.204,0-2.18-0.975-2.18-2.18l-6.633-151.666H179.741z"/> <path style="fill:#333E48;" d="M148.674,413.535l0.403,9.223c0,1.205,0.976,2.18,2.18,2.18h19.673c1.204,0,2.18-0.975,2.18-2.18 l0.403-9.223H148.674z"/> </g> <g> <path style="fill:#ebb800;" d="M297.997,271.091l-6.632,151.666c0,1.205-0.975,2.18-2.179,2.18h-19.674 c-1.204,0-2.18-0.975-2.18-2.18l-6.631-151.666H297.997z"/> <path style="fill:#333E48;" d="M266.93,413.535l0.403,9.223c0,1.205,0.976,2.18,2.18,2.18h19.674c1.204,0,2.179-0.975,2.179-2.18 l0.404-9.223H266.93z"/> </g> <path style="fill:#65513C;" d="M261.392,0c-2.936,0-5.315,2.379-5.315,5.316v18.963h10.631V5.316 C266.708,2.379,264.328,0,261.392,0z"/> <path style="fill:#65513C;" d="M278.111,0c-2.935,0-5.315,2.379-5.315,5.316v18.963h10.631V5.316 C283.428,2.379,281.048,0,278.111,0z"/> <g> <path style="fill:#FFCC35;" d="M86.79,275.396c-1.774,0-3.214-1.44-3.214-3.215c0-23.143,18.828-41.972,41.971-41.972 c1.775,0,3.215,1.439,3.215,3.214c0,1.775-1.44,3.215-3.215,3.215c-19.599,0-35.542,15.944-35.542,35.543 C90.005,273.956,88.566,275.396,86.79,275.396z"/> <path style="fill:#65513C;" d="M92.806,277.827l-1.384,7.668c-0.462,2.558-2.909,4.257-5.467,3.795 c-1.983-0.358-3.452-1.922-3.795-3.795l-1.383-7.668c-0.6-3.322,1.605-6.5,4.929-7.1c3.322-0.6,6.5,1.608,7.1,4.929 C92.937,276.388,92.929,277.135,92.806,277.827z"/> </g> <path style="fill:#FFCC35;" d="M328.439,35.697c-11.661,0-22.211-4.757-29.813-12.438h-0.005c-3.857-4.611-9.65-7.547-16.132-7.547 c-0.146,0-0.289,0.019-0.435,0.021v-0.021h-18.297c-11.171,0-20.282,8.716-20.964,19.715l-0.024,0.003l-14.47,181.278h-68.095 c-30.035,0-54.383,24.349-54.383,54.382c0,30.035,24.348,54.382,54.383,54.382h88.933c30.034,0,54.383-24.348,54.383-54.382 v-54.382l-9.472-149.37h34.391c8.736,0,15.82-7.083,15.82-15.821C344.26,42.78,337.176,35.697,328.439,35.697z"/> <g> <path style="fill:#FFCC35;" d="M143.119,271.091l-6.632,151.666c0,1.205-0.976,2.18-2.18,2.18h-19.673 c-1.204,0-2.18-0.975-2.18-2.18l-6.633-151.666H143.119z"/> <path style="fill:#333E48;" d="M112.052,413.535l0.403,9.223c0,1.205,0.976,2.18,2.18,2.18h19.673c1.204,0,2.18-0.975,2.18-2.18 l0.403-9.223H112.052z"/> </g> <g> <path style="fill:#FFCC35;" d="M261.375,271.091l-6.632,151.666c0,1.205-0.975,2.18-2.18,2.18H232.89 c-1.205,0-2.181-0.975-2.181-2.18l-6.631-151.666H261.375z"/> <path style="fill:#333E48;" d="M230.307,413.535l0.402,9.223c0,1.205,0.976,2.18,2.181,2.18h19.673c1.204,0,2.18-0.975,2.18-2.18 l0.404-9.223H230.307z"/> </g> <g> <path style="fill:#65513C;" d="M188.902,216.709h-28.697c-0.23,0-0.458,0.014-0.689,0.017c-3.883,3.811-6.298,9.112-6.298,14.983 c0,11.597,9.402,21,21.001,21s21-9.402,21-21C195.22,225.83,192.796,220.521,188.902,216.709z"/> <path style="fill:#65513C;" d="M235.48,141.465c-0.398,0-0.785,0.041-1.179,0.059l-4.132,51.747c1.715,0.353,3.49,0.54,5.311,0.54 c14.456,0,26.174-11.718,26.174-26.174C261.654,153.184,249.936,141.465,235.48,141.465z"/> <circle style="fill:#65513C;" cx="242.727" cy="257.883" r="26.174"/> <path style="fill:#65513C;" d="M296.204,101.311c-13.016,1.514-23.121,12.562-23.121,25.98c0,14.455,11.718,26.173,26.173,26.173 c0.086,0,0.168-0.011,0.254-0.012L296.204,101.311z"/> <circle style="fill:#65513C;" cx="279.22" cy="208.995" r="14.274"/> <path style="fill:#65513C;" d="M285.601,252.709c0,9.897,8.022,17.919,17.919,17.919v-35.837 C293.623,234.791,285.601,242.813,285.601,252.709z"/> <circle style="fill:#65513C;" cx="256.174" cy="95.653" r="11.9"/> <circle style="fill:#65513C;" cx="192.771" cy="286.781" r="11.899"/> <circle style="fill:#65513C;" cx="141.319" cy="262.981" r="11.9"/> </g> <circle style="fill:#333E48;" cx="278.113" cy="36.141" r="5.206"/> <path style="fill:#ebb800;" d="M330.594,35.861c-5.591,7.841-8.891,17.43-8.891,27.793c0,1.242,0.061,2.468,0.154,3.685h6.582 c8.736,0,15.82-7.083,15.82-15.821C344.26,43.514,338.308,36.915,330.594,35.861z"/> <g> <path style="fill:#FFCC35;" d="M238.903,33.396c-5.675-5.674-7.072-12.516-3.32-16.267c3.75-3.751,10.592-2.353,16.267,3.322 c5.675,5.675,7.072,12.516,3.321,16.268C251.42,40.469,244.579,39.071,238.903,33.396z"/> <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 52.835 181.3939)" style="fill:#ebb800;" cx="245.379" cy="26.919" rx="4.696" ry="9.393"/>
                </svg>
            <span>rafe</span>
        </h1>`
    )
    $('footer').html(
        `<nav>
            <div class="elipse list showHome_js">
                <svg width="110px" height="110px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8C5.10457 8 6 7.10457 6 6C6 4.89543 5.10457 4 4 4C2.89543 4 2 4.89543 2 6C2 7.10457 2.89543 8 4 8Z" fill="#FFF"/> <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" fill="#FFF"/> <path d="M6 18C6 19.1046 5.10457 20 4 20C2.89543 20 2 19.1046 2 18C2 16.8954 2.89543 16 4 16C5.10457 16 6 16.8954 6 18Z" fill="#FFF"/> <path d="M21 7.5C21.5523 7.5 22 7.05228 22 6.5V5.5C22 4.94772 21.5523 4.5 21 4.5H9C8.44772 4.5 8 4.94772 8 5.5V6.5C8 7.05228 8.44772 7.5 9 7.5H21Z" fill="#FFF"/> <path d="M22 12.5C22 13.0523 21.5523 13.5 21 13.5H9C8.44772 13.5 8 13.0523 8 12.5V11.5C8 10.9477 8.44772 10.5 9 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5Z" fill="#FFF"/> <path d="M21 19.5C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H9C8.44772 16.5 8 16.9477 8 17.5V18.5C8 19.0523 8.44772 19.5 9 19.5H21Z" fill="#FFF"/>
                </svg>
            </div>
            <div class="elipse user showUser_js">
                <svg width="110px" height="110px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#FFF" stroke="#FFF">
                    <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12 c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8 s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z"/>
                </svg>
            </div>
        </nav>`
    )   
}