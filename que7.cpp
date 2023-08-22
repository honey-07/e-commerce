//Write a C++ Proram to sort an Array in ascending order.

#include <iostream>
using namespace std;

class sorting
{
public:

	void sort(int a[],int s)
	{
		
		for (int i = 0; i < s; i++)
		{
			for (int j = 0; j < s - i - 1; j++) 
            {
                if (a[j] > a[j + 1])
                {
                   
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
		}
		for (int i = 0; i < s; ++i)
		{
			cout << " " << a[i];
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
