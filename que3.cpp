//Write a C++ program to find the sum of individual digits of a positive integer arrays.

#include <iostream>
using namespace std;

class sorting
{
public:

	void sort(int a[],int s)
	{
		
		for (int i = 0; i < s; i++)
		{
			int rem,sum=0;
			while(a[i] > 0)
			{
				
				rem=a[i]%10;
				sum += rem;
				a[i]/=10;
			}
			cout << " " << sum;
			
		}
	}

};
int main()
{
	sorting arr;
	int a[100],s;
	cout << "Enter size : ";
	cin >> s;
	cout << "Enter values : "<< endl;
	for (int i = 0; i < s; i++)
	{
		cin >> a[i];	
	}

arr.sort(a,s);
return 0;
}
