%	Copyright � 2015 Alexander Isakov. Contact: <alexander.isakov@tuhh.de>
%	Copyright � 2015 Marina Krotofil. Contact: <marina.krotofil@tuhh.de>
%	Copyright � 2015 TUHH-SVA Security in Distributed Applications.
%	All rights reserved.
%	License: http://opensource.org/licenses/BSD-3-Clause
%	----------------------------------------------------------------------
function result=iif(cond, iftrue, iffalse)

    if isscalar(cond) 
       if cond 
           result = iftrue;
       else
           result = iffalse;
       end
    else
      result = (cond).*iftrue + (~cond).*iffalse;
    end  
end