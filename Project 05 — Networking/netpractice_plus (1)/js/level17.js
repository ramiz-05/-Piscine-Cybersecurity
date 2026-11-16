
var level = 17;

// Hierarchical network: a core router, two distribution routers, a leaf router, route summaries toward the Internet

var hosts = [
    {'id':'V', 'type':'host', 'name':'Vault server', 'geometry':'200x220+900+1400', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'A', 'type':'host', 'name':'Argon', 'geometry':'200x220+50+330', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'A2', 'type':'host', 'name':'Argon junior', 'geometry':'200x220+700+330', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'B', 'type':'host', 'name':'Boron', 'geometry':'200x220+1550+450', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'E', 'type':'host', 'name':'Erbium', 'geometry':'200x220+200+1800', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'R0', 'type':'router', 'name':'Core', 'geometry':'200x200+900+950', 'img':'router.png', 'labelpos':'230,170'},
    {'id':'R1', 'type':'router', 'name':'Distribution west', 'geometry':'200x200+250+950', 'img':'router.png', 'labelpos':'210,-130'},
    {'id':'R2', 'type':'router', 'name':'Distribution east', 'geometry':'200x200+1550+950', 'img':'router.png', 'labelpos':'0,230'},
    {'id':'R3', 'type':'router', 'name':'Leaf', 'geometry':'200x200+250+1400', 'img':'router.png', 'labelpos':'210,0'},
    {'id':'SW', 'type':'switch', 'name':'West switch', 'geometry':'150x150+260+630', 'img':'switch.png', 'labelpos':'-20,-60'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+1150+360', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'V', 'rid':'Vr1', 'route':'0.0.0.0/0', 'gate':'140.[1-254]a.0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'140.[a].4.254', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'A2', 'rid':'A2r1', 'route':'0.0.0.0/0', 'gate':'140.[a].4.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'140.[a].2.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'E', 'rid':'Er1', 'route':'0.0.0.0/0', 'gate':'140.[a].5.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R0', 'rid':'R0r1', 'route':'140.[a].4.0/24', 'gate':'10.[1-254]b.0.2', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'R0', 'rid':'R0r2', 'route':'140.[a].2.0/24', 'gate':'10.[b].0.5', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R0', 'rid':'R0r3', 'route':'0.0.0.0/0', 'gate':'203.0.113.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'140.[a].5.0/24', 'gate':'10.[b].0.9', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R1', 'rid':'R1r2', 'route':'0.0.0.0/0', 'gate':'10.[b].0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r1', 'route':'0.0.0.0/0', 'gate':'10.[b].0.5', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R3', 'rid':'R3r1', 'route':'0.0.0.0/0', 'gate':'10.[b].0.10', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'I', 'rid':'Ir1', 'route':'140.[a].0.0/22', 'gate':'203.0.113.2', 'route_edit':'true', 'gate_edit':'false'}
];

var ifs = [
    {'if':'V1', 'hid':'V', 'ip':'140.[a].0.10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'A1', 'hid':'A', 'ip':'140.[a].4.10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,230'},
    {'if':'A21', 'hid':'A2', 'ip':'140.[a].4.11', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'B1', 'hid':'B', 'ip':'140.[a].2.10', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'E1', 'hid':'E', 'ip':'140.[a].5.255', 'mask':'255.255.255.0', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R01', 'hid':'R0', 'ip':'140.[a].0.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R02', 'hid':'R0', 'ip':'203.0.113.20', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'-100,-90'},
    {'if':'R03', 'hid':'R0', 'ip':'10.[b].0.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,60'},
    {'if':'R04', 'hid':'R0', 'ip':'10.[b].0.5', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R11', 'hid':'R1', 'ip':'10.[b].0.2', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'210,60'},
    {'if':'R12', 'hid':'R1', 'ip':'140.[a].4.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R13', 'hid':'R1', 'ip':'10.[b].0.9', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R21', 'hid':'R2', 'ip':'10.[b].0.6', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,60'},
    {'if':'R22', 'hid':'R2', 'ip':'140.[a].2.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R31', 'hid':'R3', 'ip':'10.[b].0.10', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R32', 'hid':'R3', 'ip':'140.[a].5.1', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'SW1', 'hid':'SW', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'203.0.113.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R01', 'if2':'V1'},
    {'if1':'R02', 'if2':'I1'},
    {'if1':'R03', 'if2':'R11'},
    {'if1':'R04', 'if2':'R21'},
    {'if1':'R12', 'if2':'SW1'},
    {'if1':'SW1', 'if2':'A1'},
    {'if1':'SW1', 'if2':'A21'},
    {'if1':'R22', 'if2':'B1'},
    {'if1':'R13', 'if2':'R31'},
    {'if1':'R32', 'if2':'E1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'A2'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'V'},
    {'id':'4', 'type':'reach', 'id1':'E', 'id2':'V'},
    {'id':'5', 'type':'reach', 'id1':'E', 'id2':'B'},
    {'id':'6', 'type':'reach', 'id1':'A', 'id2':'E'},
    {'id':'7', 'type':'reach', 'id1':'B', 'id2':'I'},
    {'id':'8', 'type':'reach', 'id1':'E', 'id2':'I'},
    {'id':'9', 'type':'reach', 'id1':'V', 'id2':'I'}
];
