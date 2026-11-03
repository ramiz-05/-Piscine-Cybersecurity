

var NB_TABS = 3;
var NB_LEVELS = 20;

function save_login()
{
	var e = document.getElementById('input_login');
    var login = e.value.trim();
    localStorage.setItem("g_saved_login", login);
    localStorage.setItem("g_my_login", login);
    if (login == '')
    {
		e.style.border = "2px solid red";
    }
    else
		setTimeout(()=>{ window.location = 'level1.html'; }, 100);
}

// evaluation: three random levels between lo and hi (6-10 classic, 11-20 expert)
function start_eval(lo, hi)
{
	var lvl = Math.round(lo + (hi-lo)*Math.random());
    localStorage.setItem("g_my_login", '');
	localStorage.setItem("g_eval_range", JSON.stringify([lo, hi]));
	localStorage.setItem("g_my_eval", JSON.stringify([lvl]));
	setTimeout(()=>{ window.location = 'level'+lvl+'.html'; }, 100);
}

// level select: replayable levels, seeded with the training login
function goto_level(n)
{
	var e = document.getElementById('input_login2');
    var login = e.value.trim();
    if (login == '')
    {
		e.style.border = "2px solid red";
		return;
    }
    localStorage.setItem("g_saved_login", login);
    localStorage.setItem("g_my_login", login);
    setTimeout(()=>{ window.location = 'level'+n+'.html'; }, 100);
}

function build_level_buttons()
{
	var html = '';
	for (var i = 1; i <= NB_LEVELS; i++)
	{
		var adv = (i > 10) ? ' class="adv"' : '';
		html += '<input type=button value="'+i+'"'+adv+' onclick="goto_level('+i+');"> ';
		if (i % 5 == 0) html += '<br />';
	}
	document.getElementById('level_buttons').innerHTML = html;
}


function load_login()
{
    var login;
    if (!(login = localStorage.getItem("g_saved_login")))
        login = ''; // will means full random during sim.
    return (login);
}


function showTab(nb)
{
	for (let i = 0; i < NB_TABS; i++)
	{
		document.getElementById("tab_"+i).style.display = (i == nb) ? "flex" : "none";
		document.getElementById("button_"+i).className = (i == nb) ? "active" : "";
	}
}