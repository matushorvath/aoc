0	in	sym_225
2	add	sym_225, sym_6, sym_6
6	db	1100
7	add	sym_238, sym_225, sym_104
11	db	0
12	mul	59, 58, sym_224
16	add	sym_224, -3422, sym_224
20	out	sym_224
22	mul	8, sym_223, sym_223
26	add	3, sym_224, sym_224
30	add	sym_224, sym_223, sym_223
34	add	59, 30, sym_225
38	add	53, 84, sym_224
42	add	-137, sym_224, sym_224
46	out	sym_224
48	mul	sym_223, 8, sym_223
52	add	3, sym_224, sym_224
56	add	sym_223, sym_224, sym_223
60	mul	42, 83, sym_225
64	mul	sym_140, sym_88, sym_224
68	add	sym_224, -4891, sym_224
72	out	sym_224
74	mul	sym_223, 8, sym_223
78	add	sym_224, 5, sym_224
82	add	sym_223, sym_224, sym_223
86	add	61, 67, sym_225
90	add	46, sym_62, sym_224
94	add	sym_224, -129, sym_224
98	out	sym_224
100	mul	sym_223, 8, sym_223
104	add	5, sym_224, sym_224
108	add	sym_223, sym_224, sym_223
112	mul	53, 40, sym_225
116	add	sym_35, 35, sym_224
120	add	sym_224, -94, sym_224
124	out	sym_224
126	mul	8, sym_223, sym_223
130	add	6, sym_224, sym_224
134	add	sym_223, sym_224, sym_223
138	add	5, 73, sym_225
142	mul	sym_191, 52, sym_224
146	add	sym_224, -1872, sym_224
150	out	sym_224
152	mul	sym_223, 8, sym_223
156	add	sym_224, 5, sym_224
160	add	sym_223, sym_224, sym_223
164	mul	82, sym_195, sym_224
168	add	-738, sym_224, sym_224
172	out	sym_224
174	mul	sym_223, 8, sym_223
178	add	sym_224, 2, sym_224
182	add	sym_224, sym_223, sym_223
186	add	83, 52, sym_225
190	add	36, 77, sym_225
194	add	9, 10, sym_225
198	add	sym_113, sym_187, sym_224
202	add	sym_224, -136, sym_224
206	out	sym_224
208	mul	sym_223, 8, sym_223
212	add	2, sym_224, sym_224
216	add	sym_224, sym_223, sym_223
220	out	sym_223
222	hlt
223	db	0
224	db	0
225	db	0
226	db	677
227	db	0
228	db	0
229	db	0
230	db	0
231	db	0
232	db	0
233	db	0
234	db	0
235	db	0
236	db	0
237	db	0
238	jnz	0, 99999
241	jnz	227, 247
244	jnz	1, 99999
247	jnz	sym_227, 99999
250	jnz	sym_0, 256
253	jnz	1, 99999
256	jz	227, 99999
259	jz	0, 265
262	jnz	1, 99999
265	jz	sym_0, 99999
268	jz	sym_227, 274
271	jnz	1, 99999
274	jnz	1, 280
277	jnz	1, 99999
280	add	sym_225, sym_225, sym_225
284	add	294, 0, sym_0
288	jnz	1, sym_0
291	jnz	1, 99999
294	jz	0, 300
297	jnz	1, 99999
300	add	sym_225, sym_225, sym_225
304	add	314, 0, sym_0
308	jz	0, sym_0
311	jnz	1, 99999
314	lt	sym_226, 226, sym_224
318	mul	sym_223, 2, sym_223
322	jz	sym_224, 329
325	add	sym_223, 1, sym_223
329	eq	226, 226, sym_224
333	mul	2, sym_223, sym_223
337	jz	sym_224, 344
340	add	1, sym_223, sym_223
344	lt	[677], 677, sym_224
348	mul	2, sym_223, sym_223
352	jz	sym_224, 359
355	add	1, sym_223, sym_223
359	eq	677, 226, sym_224
363	mul	sym_223, 2, sym_223
367	jnz	sym_224, 374
370	add	sym_223, 1, sym_223
374	lt	[677], sym_226, sym_224
378	mul	2, sym_223, sym_223
382	jnz	sym_224, 389
385	add	sym_223, 1, sym_223
389	eq	[677], 677, sym_224
393	mul	sym_223, 2, sym_223
397	jnz	sym_224, 404
400	add	1, sym_223, sym_223
404	eq	226, sym_226, sym_224
408	mul	sym_223, 2, sym_223
412	jz	sym_224, 419
415	add	1, sym_223, sym_223
419	eq	sym_226, 677, sym_224
423	mul	sym_223, 2, sym_223
427	jz	sym_224, 434
430	add	sym_223, 1, sym_223
434	lt	677, 226, sym_224
438	mul	sym_223, 2, sym_223
442	jnz	sym_224, 449
445	add	1, sym_223, sym_223
449	eq	sym_226, 226, sym_224
453	mul	2, sym_223, sym_223
457	jnz	sym_224, 464
460	add	sym_223, 1, sym_223
464	eq	sym_226, sym_226, sym_224
468	mul	sym_223, 2, sym_223
472	jz	sym_224, 479
475	add	sym_223, 1, sym_223
479	lt	226, [677], sym_224
483	mul	2, sym_223, sym_223
487	jnz	sym_224, 494
490	add	sym_223, 1, sym_223
494	lt	sym_226, sym_226, sym_224
498	mul	2, sym_223, sym_223
502	jnz	sym_224, 509
505	add	sym_223, 1, sym_223
509	lt	226, sym_226, sym_224
513	mul	2, sym_223, sym_223
517	jnz	sym_224, 524
520	add	1, sym_223, sym_223
524	lt	677, [677], sym_224
528	mul	sym_223, 2, sym_223
532	jz	sym_224, 539
535	add	1, sym_223, sym_223
539	eq	[677], sym_226, sym_224
543	mul	sym_223, 2, sym_223
547	jz	sym_224, 554
550	add	1, sym_223, sym_223
554	lt	677, 677, sym_224
558	mul	sym_223, 2, sym_223
562	jnz	sym_224, 569
565	add	1, sym_223, sym_223
569	eq	226, [677], sym_224
573	mul	sym_223, 2, sym_223
577	jz	sym_224, 584
580	add	1, sym_223, sym_223
584	lt	sym_226, [677], sym_224
588	mul	sym_223, 2, sym_223
592	jnz	sym_224, 599
595	add	sym_223, 1, sym_223
599	eq	sym_226, [677], sym_224
603	mul	2, sym_223, sym_223
607	jz	sym_224, 614
610	add	sym_223, 1, sym_223
614	eq	677, [677], sym_224
618	mul	sym_223, 2, sym_223
622	jz	sym_224, 629
625	add	sym_223, 1, sym_223
629	lt	sym_226, 677, sym_224
633	mul	sym_223, 2, sym_223
637	jz	sym_224, 644
640	add	1, sym_223, sym_223
644	eq	226, 677, sym_224
648	mul	2, sym_223, sym_223
652	jnz	sym_224, 659
655	add	sym_223, 1, sym_223
659	lt	226, 677, sym_224
663	mul	2, sym_223, sym_223
667	jz	sym_224, 674
670	add	sym_223, 1, sym_223
674	out	sym_223
676	hlt
done
