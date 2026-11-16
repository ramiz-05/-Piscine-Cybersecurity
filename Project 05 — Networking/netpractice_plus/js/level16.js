
var level = 16;

// Chained switches, two LANs behind one router, and a third LAN behind a second router

var hosts = [
    {'id':'A', 'type':'host', 'name':'Anvil', 'geometry':'200x220+60+360', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Bellows', 'geometry':'200x220+60+940', 'img':'host.png', 'labelpos':'-10,-130'},
    {'id':'C', 'type':'host', 'name':'Crucible', 'geometry':'200x220+60+1500', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'D', 'type':'host', 'name':'Dynamo', 'geometry':'200x220+1750+360', 'img':'host.png', 'labelpos':'-320,0'},
    {'id':'E', 'type':'host', 'name':'Engine', 'geometry':'200x220+1750+1050', 'img':'host.png', 'labelpos':'-320,0'},
    {'id':'F', 'type':'host', 'name':'Forge', 'geometry':'200x220+1500+1300', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'R1', 'type':'router', 'name':'Router one', 'geometry':'200x200+900+800', 'img':'router.png', 'labelpos':'-20,-150'},
    {'id':'R2', 'type':'router', 'name':'Router two', 'geometry':'200x200+900+1300', 'img':'router.png', 'labelpos':'-310,60'},
    {'id':'S1', 'type':'switch', 'name':'Switch one', 'geometry':'150x150+400+700', 'img':'switch.png', 'labelpos':'-20,-60'},
    {'id':'S2', 'type':'switch', 'name':'Switch two', 'geometry':'150x150+400+1250', 'img':'switch.png', 'labelpos':'-20,160'},
    {'id':'S3', 'type':'switch', 'name':'Switch three', 'geometry':'150x150+1500+750', 'img':'switch.png', 'labelpos':'-20,-60'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'192.168.[1-254]a.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].129', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'E', 'rid':'Er1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'F', 'rid':'Fr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].193', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'192.168.[a].128/27', 'gate':'10.[1-254]b.1.2', 'route_edit':'true', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r1', 'route':'0.0.0.0/0', 'gate':'10.[b].1.3', 'route_edit':'false', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'192.168.[a].10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'192.168.[a].11', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'C1', 'hid':'C', 'ip':'192.168.[a].12', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'D1', 'hid':'D', 'ip':'192.168.[a].130', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'E1', 'hid':'E', 'ip':'192.168.[a].131', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'F1', 'hid':'F', 'ip':'192.168.[a].194', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'R11', 'hid':'R1', 'ip':'192.168.[a].1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'R12', 'hid':'R1', 'ip':'192.168.[a].129', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,-60'},
    {'if':'R13', 'hid':'R1', 'ip':'10.[b].1.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R21', 'hid':'R2', 'ip':'10.[b].1.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R22', 'hid':'R2', 'ip':'192.168.[a].193', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'S21', 'hid':'S2', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'S31', 'hid':'S3', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'B1'},
    {'if1':'S11', 'if2':'S21'},
    {'if1':'S21', 'if2':'C1'},
    {'if1':'R12', 'if2':'S31'},
    {'if1':'S31', 'if2':'D1'},
    {'if1':'S31', 'if2':'E1'},
    {'if1':'R13', 'if2':'R21'},
    {'if1':'R22', 'if2':'F1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'C', 'id2':'E'},
    {'id':'6', 'type':'reach', 'id1':'D', 'id2':'E'},
    {'id':'7', 'type':'reach', 'id1':'A', 'id2':'F'},
    {'id':'8', 'type':'reach', 'id1':'D', 'id2':'F'},
    {'id':'9', 'type':'reach', 'id1':'E', 'id2':'F'}
];
