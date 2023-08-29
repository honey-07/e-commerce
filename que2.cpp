/* Write a C++ Program to perform following-
• compare two strings
• concate two strings
• copy the string
• find length of string
• Count the number of words and characters in a
sentence.
*/
#include <iostream>
#include <string>
using namespace std;

int main()
{
	int choice;

	cout << "Enter your choice : ";
	cin >> choice;

	cin.ignore();
	switch(choice)
	{
		case 1:
			{
				string str,str2;
				cout << "Enter string 1 : ";
				cin >> str;
				cout << "Enter string 2 : ";
				cin >> str2;

				if(str==str2)
					cout<< "BOTH THE STRINGS ARE EQUAL" << endl;
				else
					cout<< "BOTH THE STRINGS ARE NOT EQUAL" << endl;
			}
			break;
		case 2:
			{
				string str,str2;
				cout << "Enter string 1 : ";
				cin >> str;
				cout << "Enter string 2 : ";
				cin >> str2;

				str.append(str2);
				cout << "STRING IS : " << str;
			}
			break;	
		case 3:
			{
				string str;
				cout << "Enter string : ";
				getline(cin, str);
				char str2[15];
				str.copy(str2,5,3);
				cout << "STRING IS : "<< str2;
				
			}	
			break;
		case 4:
			{
				string str;
				cout << "Enter string : ";
				getline(cin, str);
				cout << "LENGTH OF STRING IS : "<< str.length();
			}	
			break;
		case 5:
			{
				string sentence;
				int word=0,character=0;

				cout << "Enter string : ";
				getline(cin, sentence);
				
				for(char c : sentence)
				{
					if(c==' ')
					{
						word++;
					}
					else
					{
						character++;
					}
				}
				word++;
				cout << "TOTAL WORDS : " << word << endl;
				cout << "TOTAL CHARACTERS : " << character << endl;
			}
			break;

		default:
			cout << "INVALID CHOICE.";
			break;
	}
	return 0;
}
