0	sym_0:
0			add	[sym_330], [sym_331], [sym_332]
4			arb	3274
6	sym_6:
6			mul	1182, 1, [sym_15]
10			add	1489, 0, [sym_24]
14	sym_14:
14			add	[sym_0], 0, [sym_570]
18	sym_18:
18			jz	[sym_570], sym_36
21			add	0, [sym_571], [sym_0]
25			add	[sym_570], -1, [sym_570]
29			add	[sym_24], 1, [sym_24]
33	sym_33:
33			jz	0, sym_18
36	sym_36:
36			eq	[sym_571], 0, [sym_571]
40			add	[sym_15], 1, [sym_15]
44			eq	[sym_15], 1489, [sym_570]
48			jz	[sym_570], sym_14
51			mul	58, 1, [rb + 0]
55			jz	0, sym_786
58	sym_58:
58			jz	[sym_332], sym_62
61			hlt
62	sym_62:
62			add	333, 0, [rb + 1]
66			add	73, 0, [rb + 0]
70			jz	0, sym_579
73			add	0, 0, [sym_572]
77	sym_77:
77			mul	0, 1, [sym_573]
81	sym_81:
81			in	[sym_574]
83			add	1, [sym_573], [sym_573]
87			lt	[sym_574], 65, [sym_570]
91			jnz	[sym_570], sym_151
94			lt	67, [sym_574], [sym_570]
98	sym_98:
98			jnz	[sym_570], sym_151
101	sym_101:
101			add	[sym_574], -64, [sym_574]
105	sym_105:
105			mul	[sym_574], -1, [sym_574]
109			add	[sym_572], 1, [sym_572]
113			lt	[sym_572], 11, [sym_570]
117	sym_117:
117			jz	[sym_570], sym_165
120			add	1182, [sym_572], [sym_127]
124			mul	[sym_574], 1, [sym_0]
128			in	[sym_574]
130			add	1, [sym_573], [sym_573]
134			eq	[sym_574], 10, [sym_570]
138			jnz	[sym_570], sym_189
141			eq	[sym_574], 44, [sym_570]
145			jz	[sym_570], sym_158
148			jz	0, sym_81
151	sym_151:
151			add	0, 340, [rb + 1]
155			jz	0, sym_177
158	sym_158:
158			add	0, 477, [rb + 1]
162			jz	0, sym_177
165	sym_165:
165			mul	1, 514, [rb + 1]
169			add	176, 0, [rb + 0]
173			jnz	1, sym_579
176			hlt
177	sym_177:
177			add	0, 184, [rb + 0]
181			jnz	1, sym_579
184			out	[sym_574]
186			out	10
188			hlt
189	sym_189:
189			lt	[sym_573], 22, [sym_570]
193			jz	[sym_570], sym_165
196			mul	[sym_572], 1, [sym_1182]
200			add	0, 375, [rb + 1]
204			mul	1, 211, [rb + 0]
208			jz	0, sym_579
211			add	1182, 11, [rb + 1]
215			add	0, 222, [rb + 0]
219			jnz	1, sym_979
222			add	0, 388, [rb + 1]
226			mul	1, 233, [rb + 0]
230			jnz	1, sym_579
233			add	1182, 22, [rb + 1]
237			add	0, 244, [rb + 0]
241			jz	0, sym_979
244			mul	1, 401, [rb + 1]
248			mul	255, 1, [rb + 0]
252			jnz	1, sym_579
255			add	1182, 33, [rb + 1]
259			mul	266, 1, [rb + 0]
263			jnz	1, sym_979
266			mul	1, 414, [rb + 1]
270			mul	277, 1, [rb + 0]
274			jnz	1, sym_579
277			in	[sym_575]
279			eq	[sym_575], 89, [sym_570]
283			eq	[sym_575], 121, [sym_575]
287			add	[sym_575], [sym_570], [sym_575]
291	sym_291:
291			in	[sym_574]
293			eq	[sym_574], 10, [sym_570]
297			jz	[sym_570], sym_291
300			out	10
302			mul	1182, 1, [rb + 1]
306			mul	1, 313, [rb + 0]
310			jnz	1, sym_622
313			jnz	[sym_575], sym_327
316			add	0, 1, [sym_575]
320			mul	1, 327, [rb + 0]
324			jnz	1, sym_786
327	sym_327:
327			out	[sym_438]
329			hlt
330	sym_330:
330			db	0
331	sym_331:
331			add	[sym_1], [sym_6], [sym_77]
335			db	97
336			jnz	110, [sym_58]
339			db	10
340			db	33
341			db	10
342			db	69
343			db	120
344			db	112
345			add	99, [sym_116], [sym_101]
349			db	100
350			db	32
351			mul	117, [sym_110], [sym_99]
355			db	116
356			jnz	111, [sym_110]
359			db	32
360			db	110
361			db	97
362			arb	101
364			db	32
365			db	98
366			db	117
367			db	116
368			db	32
369			in	111
371			db	116
372			db	58
373			db	32
374	sym_374:
374			db	0
375			db	12
376			db	70
377			db	117
378			db	110
379			hlt
380			db	116
381			jnz	111, [sym_110]
384			db	32
385			db	65
386			db	58
387			db	10
388			db	12
389			db	70
390			db	117
391			db	110
392			hlt
393			db	116
394			jnz	111, [sym_110]
397			db	32
398			db	66
399			db	58
400			db	10
401			db	12
402			db	70
403			db	117
404			db	110
405			hlt
406			db	116
407			jnz	111, [sym_110]
410			db	32
411			db	67
412			db	58
413			db	10
414			db	23
415			db	67
416			db	111
417			db	110
418			db	116
419			jnz	110, [sym_117]
422			db	111
423			db	117
424			db	115
425			db	32
426			db	118
427			jnz	100, [sym_101]
430			db	111
431			db	32
432			mul	101, [sym_101], [sym_100]
436			db	63
437			db	10
438	sym_438:
438			db	0
439			db	37
440			db	10
441			db	69
442			db	120
443			db	112
444			add	99, [sym_116], [sym_101]
448			db	100
449			db	32
450			db	82
451			db	44
452			db	32
453			db	76
454			db	44
455			db	32
456			db	111
457			db	114
458			db	32
459			db	100
460			jnz	115, [sym_116]
463			db	97
464			db	110
465			hlt
466			add	32, [sym_98], [sym_117]
470			db	116
471			db	32
472			in	111
474			db	116
475			db	58
476			db	32
477			db	36
478			db	10
479			db	69
480			db	120
481			db	112
482			add	99, [sym_116], [sym_101]
486			db	100
487			db	32
488			hlt
489			db	111
490			arb	109
492			db	97
493			db	32
494			db	111
495			db	114
496			db	32
497			db	110
498			add	119, [sym_108], [sym_105]
502			db	110
503			add	32, [sym_98], [sym_117]
507			db	116
508			db	32
509			in	111
511			db	116
512			db	58
513			db	32
514			db	43
515			db	10
516			db	68
517			add	102, [sym_105], [sym_110]
521			jnz	116, [sym_105]
524			db	111
525			db	110
526			db	115
527			db	32
528			arb	97
530			db	121
531			db	32
532			db	98
533			add	32, [sym_97], [sym_116]
537			db	32
538			arb	111
540			db	115
541			db	116
542			db	32
543			db	50
544			db	48
545			db	32
546			hlt
547			out	97
549			db	114
550			db	97
551			hlt
552			db	116
553			add	114, [sym_115], [sym_33]
557			db	10
558			db	94
559			db	62
560			db	118
561			db	60
562			db	0
563			add	[sym_0], [-1], [-1]
567			db	0
568			add	[sym_0], [sym_0], [sym_0]
572	sym_572:
572			db	0
573	sym_573:
573			db	0
574	sym_574:
574			db	0
575	sym_575:
575			add	[sym_26], [sym_0], [sym_0]
579	sym_579:
579			arb	4
581			add	0, [rb + -3], [sym_586]
585			mul	[sym_0], 1, [rb + -1]
589			add	1, [rb + -3], [rb + -3]
593			add	0, 0, [rb + -2]
597	sym_597:
597			eq	[rb + -2], [rb + -1], [sym_570]
601			jnz	[sym_570], sym_617
604			add	[rb + -3], [rb + -2], [sym_609]
608			out	[sym_0]
610			add	[rb + -2], 1, [rb + -2]
614			jnz	1, sym_597
617	sym_617:
617			arb	-4
619			jnz	1, [rb + 0]
622	sym_622:
622			arb	5
624			mul	1, [rb + -4], [sym_629]
628			add	[sym_0], 0, [rb + -2]
632			add	1, [rb + -4], [rb + -4]
636			add	0, 0, [rb + -3]
640	sym_640:
640			eq	[rb + -3], [rb + -2], [sym_570]
644			jnz	[sym_570], sym_781
647			add	[rb + -4], [rb + -3], [sym_652]
651			mul	[sym_0], 1, [rb + -1]
655			eq	[rb + -1], -4, [sym_570]
659			jnz	[sym_570], sym_709
662			eq	[rb + -1], -5, [sym_570]
666			jnz	[sym_570], sym_734
669			lt	[rb + -1], 0, [sym_570]
673			jnz	[sym_570], sym_759
676	sym_676:
676			jz	[rb + -1], sym_774
679			add	[sym_578], 562, [sym_684]
683			add	[sym_0], [sym_576], [sym_576]
687			add	[sym_578], 566, [sym_692]
691			add	[sym_0], [sym_577], [sym_577]
695			mul	702, 1, [rb + 0]
699			jnz	1, sym_786
702			add	[rb + -1], -1, [rb + -1]
706			jnz	1, sym_676
709	sym_709:
709			add	[sym_578], 1, [sym_578]
713			eq	[sym_578], 4, [sym_570]
717			jz	[sym_570], sym_724
720			add	[sym_578], -4, [sym_578]
724	sym_724:
724			mul	1, 731, [rb + 0]
728			jz	0, sym_786
731			jz	0, sym_774
734	sym_734:
734			add	[sym_578], -1, [sym_578]
738			eq	[sym_578], -1, [sym_570]
742			jz	[sym_570], sym_749
745			add	[sym_578], 4, [sym_578]
749	sym_749:
749			add	756, 0, [rb + 0]
753			jz	0, sym_786
756			jnz	1, sym_774
759	sym_759:
759			mul	[rb + -1], -11, [rb + 1]
763			add	1182, [rb + 1], [rb + 1]
767			mul	1, 774, [rb + 0]
771			jz	0, sym_622
774	sym_774:
774			add	[rb + -3], 1, [rb + -3]
778			jz	0, sym_640
781	sym_781:
781			arb	-5
783			jz	0, [rb + 0]
786	sym_786:
786			arb	7
788			jnz	[sym_575], sym_802
791			add	[sym_576], 0, [rb + -6]
795			mul	[sym_577], 1, [rb + -5]
799			jnz	1, sym_814
802	sym_802:
802			add	0, 0, [rb + -1]
806			mul	1, 0, [rb + -5]
810	sym_810:
810			add	0, 0, [rb + -6]
814	sym_814:
814			eq	[rb + -6], [sym_576], [rb + -2]
818			eq	[rb + -5], [sym_577], [sym_570]
822			mul	[sym_570], [rb + -2], [rb + -2]
826			mul	[rb + -5], 35, [rb + -3]
830			add	[rb + -6], [rb + -3], [rb + -3]
834			add	1489, [rb + -3], [rb + -3]
838			add	[rb + -3], 0, [sym_843]
842			jnz	[sym_0], sym_863
845			mul	[rb + -2], 42, [rb + -4]
849			add	46, [rb + -4], [rb + -4]
853			jz	[rb + -2], sym_924
856			mul	1, 1, [rb + -1]
860			jz	0, sym_924
863	sym_863:
863			jnz	[rb + -2], sym_873
866			mul	35, 1, [rb + -4]
870			jnz	1, sym_924
873	sym_873:
873			add	[rb + -3], 0, [sym_878]
877			eq	[sym_0], 1, [sym_570]
881			jz	[sym_570], sym_916
884			add	[sym_374], 1, [sym_374]
888			add	0, [rb + -3], [sym_895]
892			add	2, 0, [sym_0]
896			mul	[rb + -3], 1, [sym_902]
900			add	[sym_438], 0, [sym_438]
904			mul	[rb + -6], [rb + -5], [sym_570]
908			add	[sym_570], [sym_374], [sym_570]
912			add	[sym_570], [sym_438], [sym_438]
916	sym_916:
916			add	[sym_578], 558, [sym_922]
920			add	0, [sym_0], [rb + -4]
924	sym_924:
924			jz	[sym_575], sym_959
927			out	[rb + -4]
929			add	1, [rb + -6], [rb + -6]
933			eq	[rb + -6], 35, [sym_570]
937			jz	[sym_570], sym_814
940			out	10
942			add	1, [rb + -5], [rb + -5]
946			eq	[rb + -5], 51, [sym_570]
950			jz	[sym_570], sym_810
953			out	10
955			jz	[rb + -1], sym_974
958			hlt
959	sym_959:
959			jz	[rb + -1], sym_974
962			mul	1, 1, [sym_575]
966			mul	1, 973, [rb + 0]
970			jz	0, sym_786
973			hlt
974	sym_974:
974			arb	-7
976			jnz	1, [rb + 0]
979	sym_979:
979			arb	6
981			mul	1, 0, [rb + -4]
985			mul	1, 0, [rb + -3]
989	sym_989:
989			in	[rb + -2]
991			add	1, [rb + -3], [rb + -3]
995			eq	[rb + -2], 82, [rb + -1]
999			jnz	[rb + -1], sym_1030
1002			eq	[rb + -2], 76, [rb + -1]
1006			jnz	[rb + -1], sym_1037
1009			lt	[rb + -2], 48, [rb + -1]
1013			jnz	[rb + -1], sym_1124
1016			lt	57, [rb + -2], [rb + -1]
1020			jnz	[rb + -1], sym_1124
1023			add	[rb + -2], -48, [rb + -2]
1027			jz	0, sym_1041
1030	sym_1030:
1030			add	-4, 0, [rb + -2]
1034			jz	0, sym_1041
1037	sym_1037:
1037			mul	1, -5, [rb + -2]
1041	sym_1041:
1041			add	[rb + -4], 1, [rb + -4]
1045			lt	[rb + -4], 11, [rb + -1]
1049			jz	[rb + -1], sym_1138
1052			add	[rb + -5], [rb + -4], [sym_1059]
1056			mul	[rb + -2], 1, [sym_0]
1060	sym_1060:
1060			in	[rb + -2]
1062			add	1, [rb + -3], [rb + -3]
1066			lt	[rb + -2], 48, [rb + -1]
1070			jnz	[rb + -1], sym_1107
1073			lt	57, [rb + -2], [rb + -1]
1077			jnz	[rb + -1], sym_1107
1080			add	[rb + -2], -48, [rb + -2]
1084			add	[rb + -5], [rb + -4], [sym_1090]
1088			mul	10, [sym_0], [rb + -1]
1092			add	[rb + -2], [rb + -1], [rb + -2]
1096			add	[rb + -5], [rb + -4], [sym_1103]
1100			mul	1, [rb + -2], [sym_0]
1104			jnz	1, sym_1060
1107	sym_1107:
1107			eq	[rb + -2], 10, [rb + -1]
1111			jnz	[rb + -1], sym_1162
1114			eq	[rb + -2], 44, [rb + -1]
1118			jz	[rb + -1], sym_1131
1121			jnz	1, sym_989
1124	sym_1124:
1124			add	439, 0, [rb + 1]
1128			jnz	1, sym_1150
1131	sym_1131:
1131			add	0, 477, [rb + 1]
1135			jnz	1, sym_1150
1138	sym_1138:
1138			add	514, 0, [rb + 1]
1142			mul	1149, 1, [rb + 0]
1146			jnz	1, sym_579
1149			hlt
1150	sym_1150:
1150			add	1157, 0, [rb + 0]
1154			jnz	1, sym_579
1157			out	[rb + -2]
1159			out	10
1161			hlt
1162	sym_1162:
1162			lt	[rb + -3], 22, [rb + -1]
1166			jz	[rb + -1], sym_1138
1169			mul	1, [rb + -5], [sym_1176]
1173			add	0, [rb + -4], [sym_0]
1177			arb	-6
1179			jnz	1, [rb + 0]
1182	sym_1182:
1182			db	16
1183			db	11
1184			db	24
1185			add	[sym_34], [sym_1], [sym_34]
1189			add	[sym_34], [sym_1], [sym_34]
1193			add	[sym_34], [sym_1], [sym_34]
1197			add	[sym_34], [sym_1], [sym_34]
1201			add	[sym_28], [sym_7], [sym_28]
1205			add	[sym_34], [sym_1], [sym_34]
1209			add	[sym_34], [sym_1], [sym_34]
1213			add	[sym_34], [sym_1], [sym_34]
1217			add	[sym_34], [sym_1], [sym_34]
1221			add	[sym_34], [sym_11], [sym_34]
1225			add	[sym_34], [sym_1], [sym_34]
1229			add	[sym_28], [sym_13], [sym_22]
1233			add	[sym_5], [sym_1], [sym_5]
1237			add	[sym_16], [sym_13], [sym_5]
1241			add	[sym_16], [sym_1], [sym_5]
1245			add	[sym_11], [sym_1], [sym_16]
1249			add	[sym_5], [sym_1], [sym_11]
1253			add	[sym_16], [sym_1], [sym_5]
1257			add	[sym_11], [sym_1], [sym_8]
1261			db	13
1262			add	[sym_11], [sym_1], [sym_1]
1266			eq	[sym_1], [sym_7], [sym_1]
1270			in	[sym_1]
1272			db	11
1273			add	[sym_1], [sym_1], [sym_8]
1277			add	[sym_5], [sym_13], [sym_5]
1281			add	[sym_1], [sym_1], [sym_8]
1285			add	[sym_5], [sym_1], [sym_1]
1289			add	[sym_3], [sym_1], [sym_5]
1293			add	[sym_5], [sym_1], [sym_1]
1297			add	[sym_8], [sym_1], [sym_5]
1301			add	[sym_1], [sym_1], [sym_3]
1305			add	[sym_5], [sym_1], [sym_5]
1309			add	[sym_1], [sym_1], [sym_1]
1313			eq	[sym_5], [sym_1], [sym_1]
1317			add	[sym_3], [sym_1], [sym_5]
1321			add	[sym_5], [sym_1], [sym_1]
1325			add	[sym_1], [sym_1], [sym_6]
1329			add	[sym_5], [sym_1], [sym_1]
1333			add	[sym_3], [sym_1], [sym_1]
1337			db	13
1338			add	[sym_1], [sym_6], [sym_1]
1342			jnz	[sym_1], [sym_1]
1345			add	[sym_3], [sym_1], [sym_1]
1349			add	[sym_3], [sym_1], [sym_5]
1353			add	[sym_3], [sym_1], [sym_6]
1357			add	[sym_5], [sym_1], [sym_1]
1361			db	13
1362			in	[sym_1]
1364			add	[sym_7], [sym_2], [sym_1]
1368			jnz	[sym_1], [sym_5]
1371			add	[sym_1], [sym_1], [sym_3]
1375			add	[sym_1], [sym_1], [sym_3]
1379			add	[sym_1], [sym_1], [sym_1]
1383			add	[sym_3], [sym_1], [sym_2]
1387			add	[sym_5], [sym_1], [sym_5]
1391			add	[sym_1], [sym_1], [sym_3]
1395			add	[sym_1], [sym_1], [sym_3]
1399			add	[sym_1], [sym_1], [sym_1]
1403			add	[sym_3], [sym_1], [sym_2]
1407			add	[sym_5], [sym_1], [sym_5]
1411			add	[sym_1], [sym_1], [sym_3]
1415			add	[sym_1], [sym_1], [sym_3]
1419			add	[sym_1], [sym_1], [sym_1]
1423			add	[sym_3], [sym_1], [sym_2]
1427			lt	[sym_5], [sym_13], [sym_1]
1431			add	[sym_1], [sym_1], [sym_3]
1435			add	[sym_16], [sym_1], [sym_3]
1439			add	[sym_1], [sym_1], [sym_5]
1443			add	[sym_1], [sym_1], [sym_3]
1447			add	[sym_16], [sym_1], [sym_3]
1451			db	11
1452			in	[sym_1]
1454			db	16
1455			add	[sym_5], [sym_1], [sym_5]
1459			add	[sym_5], [sym_1], [sym_16]
1463			add	[sym_5], [sym_1], [sym_5]
1467			add	[sym_5], [sym_1], [sym_16]
1471			add	[sym_5], [sym_1], [sym_5]
1475			add	[sym_5], [sym_1], [sym_16]
1479			db	13
1480			jnz	[sym_1], [sym_22]
1483			add	[sym_11], [sym_1], [sym_22]
1487			db	13
done
