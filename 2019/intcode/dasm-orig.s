0       in      [225]
2       add     [225], [6], [6]
6       db      1100
7       add     [238], [225], [104]
11      db      0
12      mul     59, 58, [224]
16      add     [224], -3422, [224]
20      out     [224]
22      mul     8, [223], [223]
26      add     3, [224], [224]
30      add     [224], [223], [223]
34      add     59, 30, [225]
38      add     53, 84, [224]
42      add     -137, [224], [224]
46      out     [224]
48      mul     [223], 8, [223]
52      add     3, [224], [224]
56      add     [223], [224], [223]
60      mul     42, 83, [225]
64      mul     [140], [88], [224]
68      add     [224], -4891, [224]
72      out     [224]
74      mul     [223], 8, [223]
78      add     [224], 5, [224]
82      add     [223], [224], [223]
86      add     61, 67, [225]
90      add     46, [62], [224]
94      add     [224], -129, [224]
98      out     [224]
100     mul     [223], 8, [223]
104     add     5, [224], [224]
108     add     [223], [224], [223]
112     mul     53, 40, [225]
116     add     [35], 35, [224]
120     add     [224], -94, [224]
124     out     [224]
126     mul     8, [223], [223]
130     add     6, [224], [224]
134     add     [223], [224], [223]
138     add     5, 73, [225]
142     mul     [191], 52, [224]
146     add     [224], -1872, [224]
150     out     [224]
152     mul     [223], 8, [223]
156     add     [224], 5, [224]
160     add     [223], [224], [223]
164     mul     82, [195], [224]
168     add     -738, [224], [224]
172     out     [224]
174     mul     [223], 8, [223]
178     add     [224], 2, [224]
182     add     [224], [223], [223]
186     add     83, 52, [225]
190     add     36, 77, [225]
194     add     9, 10, [225]
198     add     [113], [187], [224]
202     add     [224], -136, [224]
206     out     [224]
208     mul     [223], 8, [223]
212     add     2, [224], [224]
216     add     [224], [223], [223]
220     out     [223]
222     hlt
223     db      0
224     db      0
225     db      0
226     db      677
227     db      0
228     db      0
229     db      0
230     db      0
231     db      0
232     db      0
233     db      0
234     db      0
235     db      0
236     db      0
237     db      0
238     jnz     0, [1105]
241     jnz     227, [1105]
244     jnz     1, [1005]
247     jnz     [227], [1005]
250     jnz     [0], [1105]
253     jnz     1, [1106]
256     jz      227, [1106]
259     jz      0, [1105]
262     jnz     1, [1006]
265     jz      [0], [1006]
268     jz      [227], [1105]
271     jnz     1, [1105]
274     jnz     1, [1105]
277     jnz     1, [1]
280     add     [225], [225], [225]
284     add     294, 0, [0]
288     jnz     1, [1105]
291     jnz     1, [1106]
294     jz      0, [1105]
297     jnz     1, [1]
300     add     [225], [225], [225]
304     add     314, 0, [0]
308     jz      0, [1105]
311     jnz     1, [1007]
314     lt      [226], 226, [224]
318     mul     [223], 2, [223]
322     jz      [224], [1001]
325     add     [223], 1, [223]
329     eq      226, 226, [224]
333     mul     2, [223], [223]
337     jz      [224], [101]
340     add     1, [223], [223]
344     lt      [677], 677, [224]
348     mul     2, [223], [223]
352     jz      [224], [101]
355     add     1, [223], [223]
359     eq      677, 226, [224]
363     mul     [223], 2, [223]
367     jnz     [224], [1001]
370     add     [223], 1, [223]
374     lt      [677], [226], [224]
378     mul     2, [223], [223]
382     jnz     [224], [1001]
385     add     [223], 1, [223]
389     eq      [677], 677, [224]
393     mul     [223], 2, [223]
397     jnz     [224], [101]
400     add     1, [223], [223]
404     eq      226, [226], [224]
408     mul     [223], 2, [223]
412     jz      [224], [101]
415     add     1, [223], [223]
419     eq      [226], 677, [224]
423     mul     [223], 2, [223]
427     jz      [224], [1001]
430     add     [223], 1, [223]
434     lt      677, 226, [224]
438     mul     [223], 2, [223]
442     jnz     [224], [101]
445     add     1, [223], [223]
449     eq      [226], 226, [224]
453     mul     2, [223], [223]
457     jnz     [224], [1001]
460     add     [223], 1, [223]
464     eq      [226], [226], [224]
468     mul     [223], 2, [223]
472     jz      [224], [1001]
475     add     [223], 1, [223]
479     lt      226, [677], [224]
483     mul     2, [223], [223]
487     jnz     [224], [1001]
490     add     [223], 1, [223]
494     lt      [226], [226], [224]
498     mul     2, [223], [223]
502     jnz     [224], [1001]
505     add     [223], 1, [223]
509     lt      226, [226], [224]
513     mul     2, [223], [223]
517     jnz     [224], [101]
520     add     1, [223], [223]
524     lt      677, [677], [224]
528     mul     [223], 2, [223]
532     jz      [224], [101]
535     add     1, [223], [223]
539     eq      [677], [226], [224]
543     mul     [223], 2, [223]
547     jz      [224], [101]
550     add     1, [223], [223]
554     lt      677, 677, [224]
558     mul     [223], 2, [223]
562     jnz     [224], [101]
565     add     1, [223], [223]
569     eq      226, [677], [224]
573     mul     [223], 2, [223]
577     jz      [224], [101]
580     add     1, [223], [223]
584     lt      [226], [677], [224]
588     mul     [223], 2, [223]
592     jnz     [224], [1001]
595     add     [223], 1, [223]
599     eq      [226], [677], [224]
603     mul     2, [223], [223]
607     jz      [224], [1001]
610     add     [223], 1, [223]
614     eq      677, [677], [224]
618     mul     [223], 2, [223]
622     jz      [224], [1001]
625     add     [223], 1, [223]
629     lt      [226], 677, [224]
633     mul     [223], 2, [223]
637     jz      [224], [101]
640     add     1, [223], [223]
644     eq      226, 677, [224]
648     mul     2, [223], [223]
652     jnz     [224], [1001]
655     add     [223], 1, [223]
659     lt      226, 677, [224]
663     mul     2, [223], [223]
667     jz      [224], [1001]
670     add     [223], 1, [223]
674     out     [223]
676     hlt
