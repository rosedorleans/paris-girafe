

let projet = window.location.pathname.split("index.php")[0].split('/')[window.location.pathname.split("index.php")[0].split('/').length - 2]
let serverURL = window.location.protocol + "//" + window.location.host + window.location.pathname.split("index.php")[0].split(projet)[0] +"/" ;
console.log('serverURL:', serverURL)

$(document).ready( async function () {
    loader(true)
    createNav()
    await getBetList()
    allowActions()
})

function loader(isStart){
    if(isStart){
        $('#blockedPage').css('display', 'block')
        $('header, .page-content').css('pointer-events', 'none')
    } else {
        $('#blockedPage').css('display', 'none')
        $('header, .page-content').css('pointer-events', 'auto')
    }
}

async function getBetList(){

    $('header .showHome_js').addClass('active')

    await $.ajax({	
        url : 'http://localhost/projets-perso/paris-girafe/index.php/bet/',
        type : 'GET',
        success : function(response){
            console.log(response);
            $('#homePage ul').empty()

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
            loader(false)
        }
    });

    $('.showBet_js').off("click")
    $('.showBet_js').on("click", async function(e){
        changeView('showBetPage')
        let betId = $(this).data('id')

        await $.ajax({	
            url : 'http://localhost/projets-perso/paris-girafe/index.php/bet/'+betId,
            type : 'GET',
            success : function(response){
                let bet = response.data
                $('#showBetPage .bet-show').empty()

                let statutName = getStatutName(bet.statut)

                $('#showBetPage .bet-show').append(
                    '<div class="bet-elem" data-id="'+bet.id+'">'+
                        '<h2>'+
                            bet.name+
                            '<p class="statut '+statutName+'">'+statutName+'</p>'+
                        '</h2>'+
                        '<p>'+bet.description+'</p>'+
                        
                        '<span class="showHome_js" data-id="'+bet.id+'">'+
                            '<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
                        '</span>'+
                        '<ul class="votes-list"></ul>'+
                    '</div>'
                )
                
            }
        });

        await $.ajax({
            url : 'http://localhost/projets-perso/paris-girafe/index.php/vote/getVotesByBetId?betId='+betId,
            type : 'GET',
            success : function(response){
                $('#showBetPage .votes-list').empty()

                if(response.data){
                    $.each(response.data, async function( key, vote ) {

                        await $.ajax({
                            url : 'http://localhost/projets-perso/paris-girafe/index.php/user/'+vote.user_id,
                            type : 'GET',
                            success : function(response){
                                if(response.data){
                                    let user = response.data

                                    $('#showBetPage .votes-list').append(
                                        '<li class="vote-elem voted">'+
                                            '<img src="templates/img/'+user.image+'" alt="photo de profil">'+
                                            '<p><span class="user-name">'+user.username+'</span> à voté</p>'+
                                            '<p class="date">'+vote.date+'</p>'+
                                        '</li>'
                                    )
                                }
                            }
                        })
    
                    })
                } else {
                    $('#showBetPage .votes-list').append(
                        '<li class="no-vote">Personne n\'a encore voté !</li>'
                    )
                }

                $('#showBetPage .votes-list').prepend(
                    '<div class="btn-box">'+
                        '<div class="vote newVote_js">'+
                            'Nouveau vote'+
                            '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#FFF"/></svg>'+
                        '</div>'+
                    '</div>'
                )
            }
        })
        loader(false)
        allowActions()
    })
}

function showVoteForm(ul) {
    let count = $(ul).length

    $(ul).find('li:first-of-type').before(
        '<li class="vote-elem form" data-id="'+count+'">'+
            '<select class="select-user-vote"></select>'+
            '<input type="date">'+
            '<div class="postVote_js">Voter</div>'+
        '</li>'
    )

    $.ajax({
        url : 'http://localhost/projets-perso/paris-girafe/index.php/user/',
        type : 'GET',
        success : function(response){
            if(response.data){
                $.each(response.data, async function( key, user ) {
                    $(ul).find('li[data-id="'+count+'"] select').append(
                        '<option class="user-option" value="'+user.id+'">'+
                            user.username+
                        '</option>'
                    )
                })

                $('.postVote_js').off("click")
                $('.postVote_js').on("click", function(e){
                    let betElem = $(this).parent().parent().parent()
                    let form = $(this).parent()

                    let T_data = {
                        "betId": betElem.data('id'),
                        "date": form.find('input[type="date"]').val(),
                        "userId": form.find('select').val(),
                    }

                    console.log('T_data:', T_data)
                    
                    $.ajax({
                        url: 'http://localhost/projets-perso/paris-girafe/index.php/vote/',
                        type: 'POST',
                        data: T_data,
                        success : function(response){
                            if(response.data){
                                console.log(response.data)

                                // $(ul).find('li.voted:first-of-type').before(
                                //     '<li class="vote-elem voted">'+
                                //         '<img src="templates/img/'+user.image+'" alt="photo de profil">'+
                                //         '<p><span class="user-name">'+user.username+'</span> à voté</p>'+
                                //         '<p class="date">'+vote.date+'</p>'+
                                //     '</li>'
                                // )

                                // form.remove()
                            }
                        }
                    })
                })
            }
        }
    })
}

function allowActions() {
    $('.showHome_js').off("click")
    $('.showHome_js').on("click", function(e){
        changeView('homePage')
        getBetList()
    })

    $('.newBet_js').off("click")
    $('.newBet_js').on("click", function(e){
        changeView('newBetPage')
    })

    $('.newVote_js').off("click")
    $('.newVote_js').on("click", function(e){
        showVoteForm($(this).parent().parent())
    })

    // $('.showUser_js').off("click")
    // $('.showUser_js').on("click", function(e){
    //     changeView('showUserPage')
    // })
}

function changeView(newView){
    $('.page-content').addClass('hidden')
    $('#'+newView).removeClass('hidden')
    $('#homePage ul').empty()

    $('header .showHome_js').removeClass('active')
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
        </h1>
        <div class="elipse yellow showHome_js">
            <svg width="235px" height="235px" viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg" stroke-width="0.30"><path d="M19 12.75H8C7.80109 12.75 7.61032 12.671 7.46967 12.5303C7.32902 12.3897 7.25 12.1989 7.25 12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25H19C19.1989 11.25 19.3897 11.329 19.5303 11.4697C19.671 11.6103 19.75 11.8011 19.75 12C19.75 12.1989 19.671 12.3897 19.5303 12.5303C19.3897 12.671 19.1989 12.75 19 12.75Z" fill="#000000"></path> <path d="M19 8.25H8C7.80109 8.25 7.61032 8.17098 7.46967 8.03033C7.32902 7.88968 7.25 7.69891 7.25 7.5C7.25 7.30109 7.32902 7.11032 7.46967 6.96967C7.61032 6.82902 7.80109 6.75 8 6.75H19C19.1989 6.75 19.3897 6.82902 19.5303 6.96967C19.671 7.11032 19.75 7.30109 19.75 7.5C19.75 7.69891 19.671 7.88968 19.5303 8.03033C19.3897 8.17098 19.1989 8.25 19 8.25Z" fill="#000000"></path> <path d="M19 17.25H8C7.80109 17.25 7.61032 17.171 7.46967 17.0303C7.32902 16.8897 7.25 16.6989 7.25 16.5C7.25 16.3011 7.32902 16.1103 7.46967 15.9697C7.61032 15.829 7.80109 15.75 8 15.75H19C19.1989 15.75 19.3897 15.829 19.5303 15.9697C19.671 16.1103 19.75 16.3011 19.75 16.5C19.75 16.6989 19.671 16.8897 19.5303 17.0303C19.3897 17.171 19.1989 17.25 19 17.25Z" fill="#000000"></path> <path d="M5.00002 8.50002C4.87 8.50161 4.74093 8.47783 4.62002 8.43002C4.50052 8.37204 4.3895 8.29802 4.29002 8.21002C4.19734 8.11658 4.12401 8.00576 4.07425 7.88392C4.02448 7.76209 3.99926 7.63163 4.00002 7.50002C4.0037 7.23525 4.10728 6.98165 4.29002 6.79002C4.38389 6.69742 4.49637 6.62583 4.62002 6.58002C4.86348 6.48 5.13656 6.48 5.38002 6.58002C5.50277 6.62761 5.61491 6.69898 5.71002 6.79002C5.89275 6.98165 5.99633 7.23525 6.00002 7.50002C6.00078 7.63163 5.97555 7.76209 5.92579 7.88392C5.87602 8.00576 5.8027 8.11658 5.71002 8.21002C5.61054 8.29802 5.49951 8.37204 5.38002 8.43002C5.25911 8.47783 5.13003 8.50161 5.00002 8.50002Z" fill="#000000"></path> <path d="M5.00002 13C4.86934 12.9984 4.74024 12.9712 4.62002 12.92C4.49883 12.8693 4.38722 12.7983 4.29002 12.71C4.19734 12.6165 4.12401 12.5057 4.07425 12.3839C4.02448 12.262 3.99926 12.1316 4.00002 12C4.0037 11.7352 4.10728 11.4816 4.29002 11.29C4.38722 11.2016 4.49883 11.1306 4.62002 11.08C4.80104 10.996 5.00303 10.9682 5.20002 11L5.38002 11.06L5.56002 11.15C5.6124 11.1869 5.6625 11.227 5.71002 11.27C5.89749 11.4666 6.00144 11.7283 6.00002 12C6.00002 12.2652 5.89466 12.5195 5.70712 12.7071C5.51959 12.8946 5.26523 13 5.00002 13Z" fill="#000000"></path> <path d="M4.99999 17.5C4.86998 17.5016 4.7409 17.4778 4.61999 17.43C4.50049 17.372 4.38947 17.298 4.28999 17.21C4.20166 17.1128 4.13063 17.0012 4.07999 16.88C4.02708 16.7603 3.99976 16.6309 3.99976 16.5C3.99976 16.3691 4.02708 16.2397 4.07999 16.12C4.13063 15.9988 4.20166 15.8872 4.28999 15.79C4.43061 15.6513 4.60919 15.5573 4.80317 15.5199C4.99716 15.4825 5.19788 15.5034 5.37999 15.58C5.50274 15.6276 5.61488 15.699 5.70999 15.79C5.79832 15.8872 5.86935 15.9988 5.91999 16.12C5.97289 16.2397 6.00022 16.3691 6.00022 16.5C6.00022 16.6309 5.97289 16.7603 5.91999 16.88C5.86935 17.0012 5.79832 17.1128 5.70999 17.21C5.61655 17.3027 5.50573 17.376 5.38389 17.4258C5.26206 17.4756 5.1316 17.5008 4.99999 17.5Z" fill="#FFF"></path></svg>
        </div>`
    )
    $('footer').html(
        // `<nav>

        // </nav>`
            // <div class="elipse yellow showUser_js">
            //     <svg viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><path d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            // </div>
    )   
}