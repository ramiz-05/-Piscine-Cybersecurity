
var level = 13;

// Chain of three routers: /30 transit links and a summarised route (aggregation)

var hosts = [
    {'id':'A', 'type':'host', 'name':'Atlas', 'geometry':'200x220+100+820', 'img':'host.png', 'labelpos':'0,-150'},
    {'id':'B', 'type':'host', 'name':'Borealis', 'geometry':'200x220+1100+1240', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'C', 'type':'host', 'name':'Cirrus', 'geometry':'200x220+1650+390', 'img':'host.png', 'labelpos':'0,-100'},
    {'id':'D', 'type':'host', 'name':'Delta', 'geometry':'200x220+1700+1290', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'R1', 'type':'router', 'name':'Router one', 'geometry':'200x200+500+840', 'img':'router.png', 'labelpos':'0,-160'},
    {'id':'R2', 'type':'router', 'name':'Router two', 'geometry':'200x200+1100+840', 'img':'router.png', 'labelpos':'0,-160'},
    {'id':'R3', 'type':'router', 'name':'Router three', 'geometry':'200x200+1700+840', 'img':'router.png', 'labelpos':'0,-205'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'192.168.[1-254]a.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].65', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'192.168.[a].113', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'0.0.0.0/0', 'gate':'10.[1-254]b.0.1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r1', 'route':'192.168.[a].0/27', 'gate':'10.[b].0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r2', 'route':'192.168.[a].96/28', 'gate':'10.[b].0.5', 'route_edit':'true', 'gate_edit':'true'},
    {'hid':'R3', 'rid':'R3r1', 'route':'0.0.0.0/32', 'gate':'10.[b].0.6', 'route_edit':'true', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'192.168.[a].2', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'192.168.[a].66', 'mask':'255.255.255.224', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'192.168.[a].98', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-190,60'},
    {'if':'D1', 'hid':'D', 'ip':'192.168.[a].112', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'192.168.[a].1', 'mask':'255.255.255.224', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'R12', 'hid':'R1', 'ip':'10.[b].0.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'R21', 'hid':'R2', 'ip':'10.[b].0.2', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'R22', 'hid':'R2', 'ip':'192.168.[a].65', 'mask':'255.255.255.224', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R23', 'hid':'R2', 'ip':'10.[b].0.5', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R31', 'hid':'R3', 'ip':'10.[b].0.6', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'R32', 'hid':'R3', 'ip':'192.168.[a].97', 'mask':'255.255.255.240', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-85'},
    {'if':'R33', 'hid':'R3', 'ip':'192.168.[a].113', 'mask':'255.255.255.240', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'}
];


var links = [
    {'if1':'A1', 'if2':'R11'},
    {'if1':'R12', 'if2':'R21'},
    {'if1':'R22', 'if2':'B1'},
    {'if1':'R23', 'if2':'R31'},
    {'if1':'R32', 'if2':'C1'},
    {'if1':'R33', 'if2':'D1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'4', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'5', 'type':'reach', 'id1':'B', 'id2':'D'},
    {'id':'6', 'type':'reach', 'id1':'C', 'id2':'D'}
];
