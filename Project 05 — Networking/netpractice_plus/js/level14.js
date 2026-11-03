
var level = 14;

// Two sites, each with its own Internet link, plus a private backup link between them

var hosts = [
    {'id':'A', 'type':'host', 'name':'Aurora', 'geometry':'200x220+100+1410', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'B', 'type':'host', 'name':'Basalt', 'geometry':'200x220+700+1410', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'C', 'type':'host', 'name':'Cobalt', 'geometry':'200x220+1100+1410', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'D', 'type':'host', 'name':'Dune', 'geometry':'200x220+1700+1410', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'R1', 'type':'router', 'name':'Site one edge', 'geometry':'200x200+400+760', 'img':'router.png', 'labelpos':'-330,0'},
    {'id':'R2', 'type':'router', 'name':'Site two edge', 'geometry':'200x200+1400+760', 'img':'router.png', 'labelpos':'210,150'},
    {'id':'S1', 'type':'switch', 'name':'Switch one', 'geometry':'150x150+425+1160', 'img':'switch.png', 'labelpos':'160,40'},
    {'id':'S2', 'type':'switch', 'name':'Switch two', 'geometry':'150x150+1425+1160', 'img':'switch.png', 'labelpos':'160,40'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+900+320', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'[11-126]a.[1-254]b.10.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'[a].[b].10.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'[a].[b].20.254', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'[a].[b].20.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'[a].[b].2.0/25', 'gate':'172.16.0.2', 'route_edit':'true', 'gate_edit':'true'},
    {'hid':'R1', 'rid':'R1r2', 'route':'0.0.0.0/0', 'gate':'198.51.100.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r1', 'route':'[a].[b].10.0/25', 'gate':'172.16.0.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r2', 'route':'0.0.0.0/0', 'gate':'198.51.100.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'I', 'rid':'Ir1', 'route':'[a].[b].10.0/25', 'gate':'198.51.100.3', 'route_edit':'true', 'gate_edit':'true'},
    {'hid':'I', 'rid':'Ir2', 'route':'[a].[b].20.0/25', 'gate':'198.51.100.2', 'route_edit':'true', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'[a].[b].10.2', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'B1', 'hid':'B', 'ip':'[a].[b].10.3', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'[a].[b].20.2', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'D1', 'hid':'D', 'ip':'[a].[b].20.3', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'[a].[b].10.1', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R12', 'hid':'R1', 'ip':'198.51.100.18', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R13', 'hid':'R1', 'ip':'172.16.0.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R21', 'hid':'R2', 'ip':'[a].[b].20.1', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R22', 'hid':'R2', 'ip':'198.51.100.2', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R23', 'hid':'R2', 'ip':'172.16.0.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-200,60'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'S21', 'hid':'S2', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'198.51.100.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'I1', 'if2':'R12'},
    {'if1':'I1', 'if2':'R22'},
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'B1'},
    {'if1':'R13', 'if2':'R23'},
    {'if1':'R21', 'if2':'S21'},
    {'if1':'S21', 'if2':'C1'},
    {'if1':'S21', 'if2':'D1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'C', 'id2':'D'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'B', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'A', 'id2':'I'},
    {'id':'6', 'type':'reach', 'id1':'C', 'id2':'I'},
    {'id':'7', 'type':'reach', 'id1':'D', 'id2':'I'}
];
