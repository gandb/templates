 
import colors from 'color-name';

console.log('node module start');

export default function somar(a,b)
{
	//start example of import into a module
	console.log(colors);
	if(colors)
	{
		console.log(colors.red);
	}
	//end example of import into a module

	return a+b;
}
