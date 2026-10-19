 function calculateGrade(score) 
	{
		if (typeof score !== 'number' ||  score < 0 || score >100)
		{
			return " 404  in input";
		}
		if (score >=90)
			return "A";
		else if (score >=80)
			return "B"
		else if (score >=70)
                	return "C";
		else if (score >=60)
                	return "D";
		else
                	return "F";
	}

function checkAccess(age, hasTicket) 
	{
    		if (typeof age === 'number' &&  typeof hasTicket === 'boolean')
		{
			
				if (age >=18  && hasTicket === true )
					return true ;
					else
					return false;
				
		}
		else	
			return false;
	
	}
