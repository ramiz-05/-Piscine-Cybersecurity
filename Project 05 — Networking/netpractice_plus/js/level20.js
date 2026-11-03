
var level = 20;

// Final boss: two Internet-connected sites, an inner data-center router, a backup link, summaries and route order

var hosts = [
    {'id':'A', 'type':'host', 'name':'Ash', 'geometry':'200x220+50+400', 'img':'host.png', 'labelpos':'210,0'},
    {'id':'B', 'type':'host', 'name':'Beech', 'geometry':'200x220+50+1190', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'C', 'type':'host', 'name':'Cypress', 'geometry':'200x220+1250+1490', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'D', 'type':'host', 'name':'Daphne', 'geometry':'200x220+1700+1490', 'img':'host.png', 'labelpos':'-40,230'},
    {'id':'E', 'type':'host', 'name':'Elder', 'geometry':'200x220+200+1790', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'F', 'type':'host', 'name':'Fir', 'geometry':'200x220+600+1790', 'img':'host.png', 'labelpos':'0,230'},
    {'id':'R1', 'type':'router', 'name':'Site one edge', 'geometry':'200x200+400+840', 'img':'router.png', 'labelpos':'-10,-235'},
    {'id':'R2', 'type':'router', 'name':'Site two edge', 'geometry':'200x200+1400+840', 'img':'router.png', 'labelpos':'210,-150'},
    {'id':'R3', 'type':'router', 'name':'Data center', 'geometry':'200x200+400+1340', 'img':'router.png', 'labelpos':'210,0'},
    {'id':'S1', 'type':'switch', 'name':'Switch one', 'geometry':'150x150+30+840', 'img':'switch.png', 'labelpos':'-20,160'},
    {'id':'S2', 'type':'switch', 'name':'Switch two', 'geometry':'150x150+1425+1210', 'img':'switch.png', 'labelpos':'160,40'},
    {'id':'I', 'type':'internet', 'name':'Internet', 'geometry':'200x240+850+380', 'img':'internet.png', 'labelpos':'210,0'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
    {'hid':'A', 'rid':'Ar1', 'route':'0.0.0.0/0', 'gate':'130.[1-254]a.1.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'B', 'rid':'Br1', 'route':'0.0.0.0/0', 'gate':'130.[a].1.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'C', 'rid':'Cr1', 'route':'0.0.0.0/0', 'gate':'130.[a].2.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'D', 'rid':'Dr1', 'route':'0.0.0.0/0', 'gate':'130.[a].2.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'E', 'rid':'Er1', 'route':'0.0.0.0/0', 'gate':'130.[a].3.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'F', 'rid':'Fr1', 'route':'0.0.0.0/0', 'gate':'130.[a].3.65', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r1', 'route':'130.[a].3.0/26', 'gate':'10.[1-254]b.1.2', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'R1', 'rid':'R1r2', 'route':'130.[a].2.0/25', 'gate':'10.[b].3.1', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R1', 'rid':'R1r3', 'route':'0.0.0.0/0', 'gate':'198.51.100.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R2', 'rid':'R2r1', 'route':'130.[a].1.0/25', 'gate':'10.[b].3.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r2', 'route':'130.[a].3.0/25', 'gate':'10.[b].3.2', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'R2', 'rid':'R2r3', 'route':'0.0.0.0/0', 'gate':'198.51.100.1', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'R3', 'rid':'R3r1', 'route':'0.0.0.0/1', 'gate':'10.[b].1.1', 'route_edit':'true', 'gate_edit':'false'},
    {'hid':'I', 'rid':'Ir1', 'route':'130.[a].1.0/25', 'gate':'198.51.100.3', 'route_edit':'false', 'gate_edit':'true'},
    {'hid':'I', 'rid':'Ir2', 'route':'130.[a].3.0/25', 'gate':'198.51.100.2', 'route_edit':'false', 'gate_edit':'false'},
    {'hid':'I', 'rid':'Ir3', 'route':'130.[a].2.0/25', 'gate':'198.51.100.2', 'route_edit':'false', 'gate_edit':'true'}
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'130.[a].1.10', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'0,230'},
    {'if':'B1', 'hid':'B', 'ip':'130.[a].1.10', 'mask':'255.255.255.128', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'C1', 'hid':'C', 'ip':'130.[a].2.10', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'D1', 'hid':'D', 'ip':'130.[a].2.128', 'mask':'255.255.255.128', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'E1', 'hid':'E', 'ip':'130.[a].3.2', 'mask':'255.255.255.192', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'F1', 'hid':'F', 'ip':'130.[a].3.64', 'mask':'255.255.255.192', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R11', 'hid':'R1', 'ip':'130.[a].1.1', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-215,60'},
    {'if':'R12', 'hid':'R1', 'ip':'198.51.100.12', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'60,-90'},
    {'if':'R13', 'hid':'R1', 'ip':'10.[b].1.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R14', 'hid':'R1', 'ip':'10.[b].3.1', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'210,60'},
    {'if':'R21', 'hid':'R2', 'ip':'130.[a].2.1', 'mask':'255.255.255.128', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,210'},
    {'if':'R22', 'hid':'R2', 'ip':'198.51.100.2', 'mask':'255.255.255.240', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'-80,-90'},
    {'if':'R23', 'hid':'R2', 'ip':'10.[b].3.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-210,60'},
    {'if':'R31', 'hid':'R3', 'ip':'10.[b].1.2', 'mask':'255.255.255.252', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'0,-80'},
    {'if':'R32', 'hid':'R3', 'ip':'130.[a].3.1', 'mask':'255.255.255.192', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-100,210'},
    {'if':'R33', 'hid':'R3', 'ip':'130.[a].3.65', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'110,210'},
    {'if':'S11', 'hid':'S1', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'S21', 'hid':'S2', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'},
    {'if':'I1', 'hid':'I', 'ip':'198.51.100.1', 'mask':'/28', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'R11', 'if2':'S11'},
    {'if1':'S11', 'if2':'A1'},
    {'if1':'S11', 'if2':'B1'},
    {'if1':'R12', 'if2':'I1'},
    {'if1':'R22', 'if2':'I1'},
    {'if1':'R13', 'if2':'R31'},
    {'if1':'R14', 'if2':'R23'},
    {'if1':'R21', 'if2':'S21'},
    {'if1':'S21', 'if2':'C1'},
    {'if1':'S21', 'if2':'D1'},
    {'if1':'R32', 'if2':'E1'},
    {'if1':'R33', 'if2':'F1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'C', 'id2':'D'},
    {'id':'3', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'4', 'type':'reach', 'id1':'B', 'id2':'D'},
    {'id':'5', 'type':'reach', 'id1':'A', 'id2':'E'},
    {'id':'6', 'type':'reach', 'id1':'C', 'id2':'F'},
    {'id':'7', 'type':'reach', 'id1':'E', 'id2':'F'},
    {'id':'8', 'type':'reach', 'id1':'A', 'id2':'I'},
    {'id':'9', 'type':'reach', 'id1':'C', 'id2':'I'},
    {'id':'10', 'type':'reach', 'id1':'E', 'id2':'I'},
    {'id':'11', 'type':'reach', 'id1':'F', 'id2':'I'}
];
