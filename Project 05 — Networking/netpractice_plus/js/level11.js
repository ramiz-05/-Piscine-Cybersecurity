
var level = 11;

// VLSM star: one router, a switch LAN and three point-to-point LANs of different sizes

var hosts = [
    {'id':'A', 'type':'host', 'name':'Alice', 'geometry':'200x220+100+430', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Bob', 'geometry':'200x220+100+1130', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'C', 'type':'host', 'name':'Carol', 'geometry':'200x220+1250+380', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'D', 'type':'host', 'name':'Dave', 'geometry':'200x220+1550+780', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'E', 'type':'host', 'name':'Eve', 'geometry':'200x220+900+1280', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'R1', 'type':'router', 'name':'Core', 'geometry':'200x200+900+780', 'img':'router.png', 'labelpos':'-10,-150'},
    {'id':'S1', 'type':'switch', 'name':'Office switch', 'geometry':'150x150+450+830', 'img':'switch.png', 'labelpos':'-20,160'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'192.168.[1-254]a.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].64', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].67', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'E', 'rid':'Er1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].114', 'route_edit':'false', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'192.168.[a].10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'192.168.[a].64', 'mask':'255.255.255.0', 'ip_edit':'true', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'192.168.[a].66', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'D1', 'hid':'D', 'ip':'192.168.[a].98', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-190,60'},
    {'if':'E1', 'hid':'E', 'ip':'192.168.[a].114', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'192.168.[a].1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'R12', 'hid':'R1', 'ip':'192.168.[a].65', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'110,-100'},
    {'if':'R13', 'hid':'R1', 'ip':'192.168.[a].97', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'R14', 'hid':'R1', 'ip':'192.168.[a].113', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,210'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'B1'},
    {'if1':'R12', 'if2':'C1'},
    {'if1':'R13', 'if2':'D1'},
    {'if1':'R14', 'if2':'E1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'E'},
    {'id':'5', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'6', 'type':'reach', 'id1':'C', 'id2':'D'},
    {'id':'7', 'type':'reach', 'id1':'C', 'id2':'E'},
    {'id':'8', 'type':'reach', 'id1':'D', 'id2':'E'}
];
