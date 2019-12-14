sym_0:
	in	[sym_225]
	add	[sym_225], [sym_6], [sym_6]
sym_6:
	db	1100
	add	[sym_238], [sym_225], [sym_104]
	db	0
	mul	59, 58, [sym_224]
	add	[sym_224], -3422, [sym_224]
	out	[sym_224]
	mul	8, [sym_223], [sym_223]
	add	3, [sym_224], [sym_224]
	add	[sym_224], [sym_223], [sym_223]
	add	59, 30, [sym_225]
	add	53, 84, [sym_224]
	add	-137, [sym_224], [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
	add	3, [sym_224], [sym_224]
	add	[sym_223], [sym_224], [sym_223]
	mul	42, 83, [sym_225]
	mul	[sym_140], [sym_88], [sym_224]
	add	[sym_224], -4891, [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
	add	[sym_224], 5, [sym_224]
	add	[sym_223], [sym_224], [sym_223]
	add	61, 67, [sym_225]
	add	46, [sym_62], [sym_224]
	add	[sym_224], -129, [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
sym_104:
	add	5, [sym_224], [sym_224]
	add	[sym_223], [sym_224], [sym_223]
	mul	53, 40, [sym_225]
	add	[sym_35], 35, [sym_224]
	add	[sym_224], -94, [sym_224]
	out	[sym_224]
	mul	8, [sym_223], [sym_223]
	add	6, [sym_224], [sym_224]
	add	[sym_223], [sym_224], [sym_223]
	add	5, 73, [sym_225]
	mul	[sym_191], 52, [sym_224]
	add	[sym_224], -1872, [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
	add	[sym_224], 5, [sym_224]
	add	[sym_223], [sym_224], [sym_223]
	mul	82, [sym_195], [sym_224]
	add	-738, [sym_224], [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
	add	[sym_224], 2, [sym_224]
	add	[sym_224], [sym_223], [sym_223]
	add	83, 52, [sym_225]
	add	36, 77, [sym_225]
	add	9, 10, [sym_225]
	add	[sym_113], [sym_187], [sym_224]
	add	[sym_224], -136, [sym_224]
	out	[sym_224]
	mul	[sym_223], 8, [sym_223]
	add	2, [sym_224], [sym_224]
	add	[sym_224], [sym_223], [sym_223]
	out	[sym_223]
	hlt
sym_223:
	db	0
sym_224:
	db	0
sym_225:
	db	0
sym_226:
	db	677
sym_227:
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
	db	0
sym_238:
	jnz	0, 99999
	jnz	227, sym_247
	jnz	1, 99999
sym_247:
	jnz	[sym_227], 99999
	jnz	[sym_0], sym_256
	jnz	1, 99999
sym_256:
	jz	227, 99999
	jz	0, sym_265
	jnz	1, 99999
sym_265:
	jz	[sym_0], 99999
	jz	[sym_227], sym_274
	jnz	1, 99999
sym_274:
	jnz	1, sym_280
	jnz	1, 99999
sym_280:
	add	[sym_225], [sym_225], [sym_225]
	add	294, 0, [sym_0]
	jnz	1, [sym_0]
	jnz	1, 99999
	jz	0, sym_300
	jnz	1, 99999
sym_300:
	add	[sym_225], [sym_225], [sym_225]
	add	314, 0, [sym_0]
	jz	0, [sym_0]
	jnz	1, 99999
	lt	[sym_226], 226, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_329
	add	[sym_223], 1, [sym_223]
sym_329:
	eq	226, 226, [sym_224]
	mul	2, [sym_223], [sym_223]
	jz	[sym_224], sym_344
	add	1, [sym_223], [sym_223]
sym_344:
	lt	[677], 677, [sym_224]
	mul	2, [sym_223], [sym_223]
	jz	[sym_224], sym_359
	add	1, [sym_223], [sym_223]
sym_359:
	eq	677, 226, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jnz	[sym_224], sym_374
	add	[sym_223], 1, [sym_223]
sym_374:
	lt	[677], [sym_226], [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_389
	add	[sym_223], 1, [sym_223]
sym_389:
	eq	[677], 677, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jnz	[sym_224], sym_404
	add	1, [sym_223], [sym_223]
sym_404:
	eq	226, [sym_226], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_419
	add	1, [sym_223], [sym_223]
sym_419:
	eq	[sym_226], 677, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_434
	add	[sym_223], 1, [sym_223]
sym_434:
	lt	677, 226, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jnz	[sym_224], sym_449
	add	1, [sym_223], [sym_223]
sym_449:
	eq	[sym_226], 226, [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_464
	add	[sym_223], 1, [sym_223]
sym_464:
	eq	[sym_226], [sym_226], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_479
	add	[sym_223], 1, [sym_223]
sym_479:
	lt	226, [677], [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_494
	add	[sym_223], 1, [sym_223]
sym_494:
	lt	[sym_226], [sym_226], [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_509
	add	[sym_223], 1, [sym_223]
sym_509:
	lt	226, [sym_226], [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_524
	add	1, [sym_223], [sym_223]
sym_524:
	lt	677, [677], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_539
	add	1, [sym_223], [sym_223]
sym_539:
	eq	[677], [sym_226], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_554
	add	1, [sym_223], [sym_223]
sym_554:
	lt	677, 677, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jnz	[sym_224], sym_569
	add	1, [sym_223], [sym_223]
sym_569:
	eq	226, [677], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_584
	add	1, [sym_223], [sym_223]
sym_584:
	lt	[sym_226], [677], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jnz	[sym_224], sym_599
	add	[sym_223], 1, [sym_223]
sym_599:
	eq	[sym_226], [677], [sym_224]
	mul	2, [sym_223], [sym_223]
	jz	[sym_224], sym_614
	add	[sym_223], 1, [sym_223]
sym_614:
	eq	677, [677], [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_629
	add	[sym_223], 1, [sym_223]
sym_629:
	lt	[sym_226], 677, [sym_224]
	mul	[sym_223], 2, [sym_223]
	jz	[sym_224], sym_644
	add	1, [sym_223], [sym_223]
sym_644:
	eq	226, 677, [sym_224]
	mul	2, [sym_223], [sym_223]
	jnz	[sym_224], sym_659
	add	[sym_223], 1, [sym_223]
sym_659:
	lt	226, 677, [sym_224]
	mul	2, [sym_223], [sym_223]
	jz	[sym_224], sym_674
	add	[sym_223], 1, [sym_223]
sym_674:
	out	[sym_223]
	hlt
done
