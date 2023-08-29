//Write a C++ Program to add, subtract, multiply and divide two numbers using class template.

#include<iostream>
using namespace std;

template<class t,class t2>
class operation
{

public:
	void operations(t n1,t2 n2)
	{
		cout << "ADDITION IS : " << n1 + n2 << endl;
		cout << "SUBSTRACTION IS : " << n1 - n2 << endl;
		cout << "MULTIPLICATION IS : " << n1 * n2 << endl;
		cout << "DIVISION IS : " << n1 / n2 << endl;
	}
};
int main()
{	operation<int,float>ob;
	ob.operations(7,11.9);
return 0;
}
