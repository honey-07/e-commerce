// Write a program to create a function template for finding minimum value contained in an array.

#include<iostream>
using namespace std;
template<class t>

t min(t a[],t s)
{
  t min=a[0];
		for (int i = 1; i < s; i++)
		{		
			if(min > a[i]){
			min=a[i];
			}	
		}
		cout << "MINIMUM NUMBER FROM ARRAY IS : " << min;
}

int main()

{
	int a[30],s;
	cout << "Enter size: ";
	cin >> s;

	cout << "Enter array elements : ";

	for (int i = 0; i < s; i++)
	{
		cin >> a[i];
	}
	min(a,s);
return 0;	
}
