
var level = 15;

// Route order trap: the first matching route wins, so a broad route placed before a narrow one swallows its traffic

var hosts = [
    {'id':'A', 'type':'host', 'name':'Alpha', 'geometry':'200x220+50+410', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'D', 'type':'host', 'name':'Delta', 'geometry':'200x220+50+1210', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Bravo', 'geometry':'200x220+1750+560', 'img':'host.png', 'labelpos':'-190,-150'},
    {'id':'C', 'type':'host', 'name':'Charlie', 'geometry':'200x220+1750+1160', 'img':'host.png', 'labelpos':'-190,-150'},
    {'id':'R1', 'type':'router', 'name':'Hub', 'geometry':'200x200+900+960', 'img':'router.png', 'labelpos':'-250,230'},
    {'id':'R2', 'type':'router', 'name':'Spoke north', 'geometry':'200x200+1300+560', 'img':'router.png', 'labelpos':'-120,-150'},
    {'id':'R3', 'type':'router', 'name':'Spoke south', 'geometry':'200x200+1300+1160', 'img':'router.png', 'labelpos':'-120,230'},
    {'id':'S1', 'type':'switch', 'name':'LAN switch', 'geometry':'150x150+425+860', 'img':'switch.png', 'labelpos':'-20,160'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+700+320', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'[11-99]a.[100-199]b.7.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'[a].[b].7.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'10.1.0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'10.2.0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'10.0.0.0/8', 'gate':'10.255.0.2', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r2', 'route':'10.2.0.0/16', 'gate':'10.255.0.6', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r3', 'route':'0.0.0.0/0', 'gate':'203.0.113.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r1', 'route':'0.0.0.0/0', 'gate':'10.255.0.6', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R3', 'rid':'R3r1', 'route':'0.0.0.0/0', 'gate':'10.255.0.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'I', 'rid':'Ir1', 'route':'[a].[b].7.0/27', 'gate':'203.0.113.2', 'route_edit':'true', 'gate_edit':'false'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'[a].[b].7.50', 'mask':'255.255.255.192', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,230'},
    {'if':'D1', 'hid':'D', 'ip':'[a].[b].7.50', 'mask':'255.255.255.192', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'B1', 'hid':'B', 'ip':'10.1.0.10', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'C1', 'hid':'C', 'ip':'10.2.0.10', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,230'},
    {'if':'R11', 'hid':'R1', 'ip':'[a].[b].7.1', 'mask':'255.255.255.192', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'R12', 'hid':'R1', 'ip':'10.255.0.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,-90'},
    {'if':'R13', 'hid':'R1', 'ip':'10.255.0.5', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,120'},
    {'if':'R14', 'hid':'R1', 'ip':'203.0.113.2', 'mask':'255.255.255.240', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-60,-90'},
    {'if':'R21', 'hid':'R2', 'ip':'10.255.0.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,120'},
    {'if':'R22', 'hid':'R2', 'ip':'10.1.0.1', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R31', 'hid':'R3', 'ip':'10.255.0.6', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'R32', 'hid':'R3', 'ip':'10.2.0.1', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'203.0.113.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'D1'},
    {'if1':'R12', 'if2':'R21'},
    {'if1':'R13', 'if2':'R31'},
    {'if1':'R14', 'if2':'I1'},
    {'if1':'R22', 'if2':'B1'},
    {'if1':'R32', 'if2':'C1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'B', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'A', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'A', 'id2':'I'},
    {'id':'6', 'type':'reach', 'id1':'D', 'id2':'I'},
    {'id':'7', 'type':'reach', 'id1':'D', 'id2':'C'}
];
