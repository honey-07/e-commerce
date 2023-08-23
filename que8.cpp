// Write a C++ Program to print Addition of two matrices.

#include<iostream>
using namespace std;

class matrix
{
public:
	void addition(int a1[20][20], int a2[20][20],int r1,int c1,int r2,int c2)
	{
		cout << "MATRIX 1 : "<<endl;
		for (int i = 0; i < r1; i++)
		{
			for (int j = 0; j < c1; j++)
			{
				cout << " " << a1[i][j];
			}
			cout << endl;
		}

		cout << "MATRIX 2 : "<<endl;
		for (int i = 0; i < r2; i++)
		{
			for (int j = 0; j < c2; j++)
			{
				cout << " " << a2[i][j];
			}
			cout << endl;
		}

		int add[20][20];
		cout << "ADDITION OF BOTH MATRIX IS : "<< endl;
		for (int i = 0; i < r1; i++)
		{
			for (int j = 0; j < c1; j++)
			{	
				add[i][j] = a1[i][j] + a2[i][j]; 
				cout << " " << add[i][j];
			}
			cout << endl;
		}
	}
};
int main()
{
	matrix arr;

	int a1[20][20],a2[20][20],r1=3,c1=3,c2=3,r2=3;

	cout << "Enter elements of 1st matrix : ";
	 for (int i = 0; i < r1; i++)
	 {
	 	for (int j = 0; j < c1; j++)
	 	{
	 		cin >> a1[i][j];
	 	}
	 }

	cout << "Enter elements of 2nd matrix : ";
	 for (int i = 0; i < r2; i++)
	 {
	 	for (int j = 0; j < c2; j++)
	 	{
	 		cin >> a2[i][j];
	 	}
	 }

	 arr.addition(a1,a2,r1,c1,r2,c2);

return 0;
}
