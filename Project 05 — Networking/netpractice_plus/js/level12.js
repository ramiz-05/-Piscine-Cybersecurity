
var level = 12;

// Two routers in series: static routes in both directions

var hosts = [
    {'id':'A', 'type':'host', 'name':'Ada', 'geometry':'200x220+100+390', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Ben', 'geometry':'200x220+100+1090', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'C', 'type':'host', 'name':'Cleo', 'geometry':'200x220+1750+340', 'img':'host.png', 'labelpos':'-320,0'},
    {'id':'D', 'type':'host', 'name':'Dan', 'geometry':'200x220+1750+1140', 'img':'host.png', 'labelpos':'-320,0'},
    {'id':'R1', 'type':'router', 'name':'West gateway', 'geometry':'200x200+800+740', 'img':'router.png', 'labelpos':'-20,-190'},
    {'id':'R2', 'type':'router', 'name':'East gateway', 'geometry':'200x200+1200+740', 'img':'router.png', 'labelpos':'-20,-190'},
    {'id':'S1', 'type':'switch', 'name':'West switch', 'geometry':'150x150+450+760', 'img':'switch.png', 'labelpos':'-20,160'},
    {'id':'S2', 'type':'switch', 'name':'East switch', 'geometry':'150x150+1600+760', 'img':'switch.png', 'labelpos':'-20,160'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'172.16.[1-254]a.1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'172.16.[a].129', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'192.168.[1-254]c.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'192.168.[c].1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'192.168.[c].32/27', 'gate':'10.[1-254]b.0.1', 'route_edit':'true', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r1', 'route':'172.16.[a].0/25', 'gate':'10.[b].0.2', 'route_edit':'true', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'172.16.[a].130', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'172.16.[a].130', 'mask':'255.255.255.0', 'ip_edit':'true', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'192.168.[c].5', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'D1', 'hid':'D', 'ip':'192.168.[c].6', 'mask':'255.255.255.224', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'172.16.[a].129', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'R12', 'hid':'R1', 'ip':'10.[b].0.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'60,-90'},
    {'if':'R21', 'hid':'R2', 'ip':'10.[b].0.3', 'mask':'255.255.255.252', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'-80,-90'},
    {'if':'R22', 'hid':'R2', 'ip':'192.168.[c].1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'S21', 'hid':'S2', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'B1'},
    {'if1':'R12', 'if2':'R21'},
    {'if1':'R22', 'if2':'S21'},
    {'if1':'S21', 'if2':'C1'},
    {'if1':'S21', 'if2':'D1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'C', 'id2':'D'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'6', 'type':'reach', 'id1':'B', 'id2':'D'}
];
