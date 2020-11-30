#include <stdio.h> 
#include <math.h> 

int main(void ) 
{ 
int a, b, i; 
double s; 

/* Pedir l´ımites inferior y superior. */ 
printf("L´ımite inferior: "); 
scanf("%d ", &a); 
while (a < 0) { 
printf("No puede ser negativo\n "); 
printf("L´ımite inferior: "); 
scanf("%d ", &a); 
} 

printf("L´ımite superior: "); 
scanf("%d ", &b); 
while (b < a) { 
printf("No puede ser menor que %d\n ",a); 
printf("L´ımite superior: "); 
scanf("%d ", &b); 
} 

/* Calcular el sumatorio de la ra´ız cuadrada de i 
para i entre a y b. */ 
s = 0.0; 
for (i = a; i <= b; i++) { 
s += sqrt(i); 
} 

/* Mostrar el resultado. */ 
printf("Sumatorio de ra´ıces "); 
printf("de %d a %d: %f\n ", a, b, s); 

return 0;

}