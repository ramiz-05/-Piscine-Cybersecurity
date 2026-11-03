
var level = 19;

// Headquarters with chained switches, two branch offices, VLSM and a summarised Internet route

var hosts = [
    {'id':'A', 'type':'host', 'name':'Amber', 'geometry':'200x220+60+360', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Birch', 'geometry':'200x220+60+940', 'img':'host.png', 'labelpos':'-10,-130'},
    {'id':'C', 'type':'host', 'name':'Cedar', 'geometry':'200x220+60+1550', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'D', 'type':'host', 'name':'Dogwood', 'geometry':'200x220+1550+360', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'E', 'type':'host', 'name':'Elm', 'geometry':'200x220+1550+1400', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'H', 'type':'router', 'name':'Headquarters', 'geometry':'200x200+900+900', 'img':'router.png', 'labelpos':'-320,-140'},
    {'id':'BR1', 'type':'router', 'name':'Branch one', 'geometry':'200x200+1550+800', 'img':'router.png', 'labelpos':'210,0'},
    {'id':'BR2', 'type':'router', 'name':'Branch two', 'geometry':'200x200+900+1400', 'img':'router.png', 'labelpos':'-310,60'},
    {'id':'SWa', 'type':'switch', 'name':'Switch top', 'geometry':'150x150+400+700', 'img':'switch.png', 'labelpos':'-20,-60'},
    {'id':'SWb', 'type':'switch', 'name':'Switch bottom', 'geometry':'150x150+400+1300', 'img':'switch.png', 'labelpos':'-20,160'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+850+360', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'120.[1-254]a.0.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'120.[a].0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'120.[a].0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'120.[a].0.130', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'E', 'rid':'Er1', 'route':'0.0.0.0/0', 'gate':'120.[a].0.193', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'H', 'rid':'Hr1', 'route':'120.[a].0.128/27', 'gate':'10.[1-254]b.0.2', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'H', 'rid':'Hr2', 'route':'120.[a].0.192/27', 'gate':'10.[b].0.5', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'H', 'rid':'Hr3', 'route':'0.0.0.0/0', 'gate':'203.0.113.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'BR1', 'rid':'BR1r1', 'route':'0.0.0.0/0', 'gate':'10.[b].0.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'BR2', 'rid':'BR2r1', 'route':'0.0.0.0/0', 'gate':'10.[b].0.5', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'I', 'rid':'Ir1', 'route':'120.[a].0.0/25', 'gate':'203.0.113.2', 'route_edit':'true', 'gate_edit':'false'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'120.[a].0.10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'120.[a].0.11', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'C1', 'hid':'C', 'ip':'120.[a].0.12', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'D1', 'hid':'D', 'ip':'120.[a].0.130', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'E1', 'hid':'E', 'ip':'120.[a].0.194', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-200,60'},
    {'if':'H1', 'hid':'H', 'ip':'120.[a].0.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'-210,60'},
    {'if':'H2', 'hid':'H', 'ip':'203.0.113.12', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-90'},
    {'if':'H3', 'hid':'H', 'ip':'10.[b].0.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,0'},
    {'if':'H4', 'hid':'H', 'ip':'10.[b].0.5', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'BR11', 'hid':'BR1', 'ip':'10.[b].0.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,60'},
    {'if':'BR12', 'hid':'BR1', 'ip':'120.[a].0.129', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'BR21', 'hid':'BR2', 'ip':'10.[b].0.6', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'BR22', 'hid':'BR2', 'ip':'120.[a].0.193', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'SWa1', 'hid':'SWa', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'SWb1', 'hid':'SWb', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'203.0.113.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'H1', 'if2':'SWa1'},
    {'if1':'SWa1', 'if2':'A1'},
    {'if1':'SWa1', 'if2':'B1'},
    {'if1':'SWa1', 'if2':'SWb1'},
    {'if1':'SWb1', 'if2':'C1'},
    {'if1':'H2', 'if2':'I1'},
    {'if1':'H3', 'if2':'BR11'},
    {'if1':'BR12', 'if2':'D1'},
    {'if1':'H4', 'if2':'BR21'},
    {'if1':'BR22', 'if2':'E1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'C', 'id2':'E'},
    {'id':'6', 'type':'reach', 'id1':'D', 'id2':'E'},
    {'id':'7', 'type':'reach', 'id1':'A', 'id2':'I'},
    {'id':'8', 'type':'reach', 'id1':'D', 'id2':'I'},
    {'id':'9', 'type':'reach', 'id1':'E', 'id2':'I'}
];
