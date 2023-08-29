/* Write a C++ Program to display largest among two numbers using function template.
 Pass Integer, Float as parameter to the function template.*/

#include<iostream>
using namespace std;

template<class t1, class t2>
void display(t1 n1,t2 n2)
{
	if(n1 > n2)
		cout << "LARGEST NUMBER IS : " << n1;
	else
		cout << "LARGEST NUMBER IS : "<< n2;
}

int main()
{
	int n1;
	float n2;
	cout << "Enter integer number : ";
	cin >> n1;
	cout << "Enter float number : ";
	cin >> n2;

	display(n1,n2);
return 0;	
}
