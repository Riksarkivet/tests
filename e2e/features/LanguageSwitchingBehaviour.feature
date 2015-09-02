Feature: Language Switching Behaviour
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to switch language whilst working.

#Scenario: Viewer user switches language while on an advanced page
#  Given the user is viewing the Viewer in English on page Image 2
#   When they change language to Welsh
#   Then the content of the page Image 2 is displayed to the user
#
#Scenario: Viewer user switches language while the metadata panel is open
#  Given the user is viewing the Viewer in English
#    And the MORE INFORMATION panel is expanded
#   When they change language to Welsh
#   Then the metadata side panel is expanded
#
#Scenario: Viewer user switches language while the contents panel is open
#  Given the user is viewing the Viewer in English
#    And the CONTENTS panel is collapsed
#   When they change language to Welsh
#   Then the CONTENTS panel is not visible to the user
#
#Scenario: Viewer user switches language while zoomed
#  Given the user is viewing the Viewer
#   When they click zoom in button
#    And the current zoom level is recorded
#    And they change language to Welsh
#   Then the current zoom level matches that which was recorded within 15% tolerance

Scenario: Viewer user switches language using the toggle button
  Given the user is viewing the Viewer in English with Welsh as secondary locale
   When they click the locale toggle button
   Then the locale toggle button reads EN

Scenario: Viewer user switches language using the toggle button
  Given the user is viewing the Viewer in Welsh with English as secondary locale
   When they click the locale toggle button
   Then the locale toggle button reads CY
