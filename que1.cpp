//Write a C++ Program to print Multiplication of two matrices.

#include<iostream>
using namespace std;
class matrix
{
public:
	void mul(int m1[][30],int m2[][30],int r1,int c1,int r2,int c2)
	{
		
		cout << "matrix 1 : "<< endl;
			for (int i = 0; i < r1; i++)
			{
				for (int j = 0; j < c1; j++)
				{
						cout <<" "<< m1[i][j];
				}	
				cout << endl;
			}

		cout << "matrix 2 : " << endl ;
			for (int i = 0; i < r2; i++)
			{
				for (int j = 0; j < c2; j++)
				{
						cout <<" "<< m2[i][j];
				}	
				cout << endl;
			}

			cout << "MATRIX 3" <<endl;
			for (int i = 0; i < r1; i++)
			{
				int m3[30][30];
				for (int j = 0; j < c2; j++)
				{
					for (int k = 0; k < c1 ; k++)
					{
						m3[i][j] += m1[i][k]*m2[k][j];
					}
					cout <<" "<< m3[i][j];
				}
				
				cout << endl;
			}

	}
};

int main()
{
	matrix arr;
	int m1[30][30],m2[30][30],r1,r2,c1,c2;

	cout << "Enter row1 and column1 size : ";
	cin >> r1 >> c1;

	cout << "Enter row2 and column2 size : ";
	cin >> r2 >> c2;


	

cout << "Enter value of matrix 1 : ";
for (int i = 0; i < r1; i++)
{
	for (int j = 0; j < c1; j++)
	{
		cin >> m1[i][j];
	}	
}

cout << "Enter value of matrix 2 : ";
for (int i = 0; i < r2; i++)
{
	for (int j = 0; j < c2; j++)
	{
		cin >> m2[i][j];
	}
}
arr.mul(m1,m2,r1,c1,r2,c2);

return 0;
}
