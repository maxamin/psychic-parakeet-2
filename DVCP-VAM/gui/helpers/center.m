%	Copyright � 2015 Alexander Isakov. Contact: <alexander.isakov@tuhh.de>
%	Copyright � 2015 Marina Krotofil. Contact: <marina.krotofil@tuhh.de>
%	Copyright � 2015 TUHH-SVA Security in Distributed Applications.
%	All rights reserved.
%	License: http://opensource.org/licenses/BSD-3-Clause
%	----------------------------------------------------------------------
function center(window)

    if isfigure(window)
        screenSize = get(0, 'ScreenSize');
        set(window, 'Units', 'pixels');
        position = get(window, 'Position');
        position(1) = (screenSize(3) - position(3))/2;
        position(2) = (screenSize(4) - position(4))/2;
        set(window, 'Position', position);
    end
end