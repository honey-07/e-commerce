// Write a C++ Proram to return sorted Array in ascending order and print the sorted array in a function.
#include<iostream>
using namespace std;
class array
{
public:
	void sorting(int a[],int s)
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

        cout << "SORTED ARRAY IN ASCENDING ORDER :  ";
        for (int i = 0; i < s; i++) 
        {
        	cout << " " << a[i];
        }
	}
};
int main()
{
	array arr;
	int a[30],s;

	cout << "Enter size : ";
	cin >> s;

	cout << "Enter elements : ";
	for (int i = 0; i < s; i++)
	{
		cin >> a[i];
	}

arr.sorting(a,s);
return 0;
}
