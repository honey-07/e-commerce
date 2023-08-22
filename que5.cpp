// Write a program to read 10 integers in an array. Find the largest and smallest number.

#include<iostream>
using namespace std;
class number
{
public:
	void max(int a[],int s)
	{	
		int max=a[0];
		for (int i = 0; i < s; i++)
		{

			if(max < a[i])
			{
				max=a[i];
			}
		}
		cout << "LARGEST NUMBER FROM ARRAY IS : " << max <<endl;
	}

	void min(int a[],int s)
	{	
		int min=a[0];
		for (int i = 0; i < s; i++)
		{

			if(min > a[i])
			{
				min=a[i];
			}
		}
		cout << "SMALLEST NUMBER FROM ARRAY IS : " << min <<endl;

	}
};
int main()
{
	number arr;
	int a[100],s;
	cout << "Enter size : ";
	cin >> s;

	cout << "Enter values of an array elements : " << endl;
	for (int i = 0; i < s; i++)
	{
		cin >> a[i];
	}

	arr.max(a,s);
	arr.min(a,s);	
return 0;
}
