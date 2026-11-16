
var level = 18;

// Triangle of routers: pick the direct links, avoid routing loops, keep a default route toward the Internet

var hosts = [
    {'id':'B', 'type':'host', 'name':'Bismuth', 'geometry':'200x220+50+360', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'D', 'type':'host', 'name':'Dysprosium', 'geometry':'200x220+50+930', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'A', 'type':'host', 'name':'Argon', 'geometry':'200x220+100+1680', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'C', 'type':'host', 'name':'Cesium', 'geometry':'200x220+1500+1730', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'R1', 'type':'router', 'name':'West router', 'geometry':'200x200+300+1280', 'img':'router.png', 'labelpos':'-305,-60'},
    {'id':'R2', 'type':'router', 'name':'North router', 'geometry':'200x200+900+680', 'img':'router.png', 'labelpos':'-20,-150'},
    {'id':'R3', 'type':'router', 'name':'East router', 'geometry':'200x200+1500+1280', 'img':'router.png', 'labelpos':'210,0'},
    {'id':'SW', 'type':'switch', 'name':'North switch', 'geometry':'150x150+450+680', 'img':'switch.png', 'labelpos':'-20,-60'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+1300+340', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'77.[a].1.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'77.[1-254]a.2.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'77.[a].2.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'77.[a].3.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'77.[a].2.0/24', 'gate':'10.[1-254]b.12.2', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r2', 'route':'77.[a].3.0/24', 'gate':'10.[b].12.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R1', 'rid':'R1r3', 'route':'0.0.0.0/0', 'gate':'10.[b].12.2', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r1', 'route':'77.[a].1.0/24', 'gate':'10.[b].12.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r2', 'route':'77.[a].3.0/24', 'gate':'10.[b].12.1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r3', 'route':'0.0.0.0/0', 'gate':'203.0.113.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R3', 'rid':'R3r1', 'route':'77.[a].11.0/24', 'gate':'10.[b].13.1', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'R3', 'rid':'R3r2', 'route':'77.[a].2.0/24', 'gate':'10.[b].23.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R3', 'rid':'R3r3', 'route':'0.0.0.0/0', 'gate':'10.[b].13.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'I', 'rid':'Ir1', 'route':'77.[a].0.0/24', 'gate':'203.0.113.2', 'route_edit':'true', 'gate_edit':'false'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'77.[a].1.10', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'B1', 'hid':'B', 'ip':'77.[a].2.10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,230'},
    {'if':'D1', 'hid':'D', 'ip':'77.[a].2.11', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'77.[a].3.0', 'mask':'255.255.255.0', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'77.[a].1.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-30,210'},
    {'if':'R12', 'hid':'R1', 'ip':'10.[b].12.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'60,-90'},
    {'if':'R13', 'hid':'R1', 'ip':'10.[b].13.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R21', 'hid':'R2', 'ip':'10.[b].12.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-100,210'},
    {'if':'R22', 'hid':'R2', 'ip':'77.[a].2.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,0'},
    {'if':'R23', 'hid':'R2', 'ip':'10.[b].23.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'110,210'},
    {'if':'R24', 'hid':'R2', 'ip':'203.0.113.1', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'210,100'},
    {'if':'R31', 'hid':'R3', 'ip':'10.[b].13.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,60'},
    {'if':'R32', 'hid':'R3', 'ip':'10.[b].23.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-90'},
    {'if':'R33', 'hid':'R3', 'ip':'77.[a].3.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'SW1', 'hid':'SW', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'203.0.113.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'A1'},
    {'if1':'R12', 'if2':'R21'},
    {'if1':'R13', 'if2':'R31'},
    {'if1':'R22', 'if2':'SW1'},
    {'if1':'SW1', 'if2':'B1'},
    {'if1':'SW1', 'if2':'D1'},
    {'if1':'R23', 'if2':'R32'},
    {'if1':'R24', 'if2':'I1'},
    {'if1':'R33', 'if2':'C1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'D', 'id2':'C'},
    {'id':'6', 'type':'reach', 'id1':'A', 'id2':'I'},
    {'id':'7', 'type':'reach', 'id1':'B', 'id2':'I'},
    {'id':'8', 'type':'reach', 'id1':'C', 'id2':'I'}
];
