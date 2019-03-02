from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.recycleview import RecycleView
from kivy.uix.gridlayout import GridLayout
from kivy.core.window import Window
from kivy.config import ConfigParser
from kivy.uix.textinput import TextInput
from kivy.uix.label import Label
from kivy.metrics import dp
from datetime import datetime
import os
import ast
import time, json

class SimpleApp(App):
 def build(self):
  self.textInput = TextInput()
  self.label = Label(text='Your Message')
  
  self.button = Button(text='click it')
  
  self.button.bind(on_press=self.displayMessage)
  self.boxLayout = BoxLayout(orientation='vertical')
  self.boxLayout.add_widget(self.textInput)
  self.boxLayout.add_widget(self.label)
  self.boxLayout.add_widget(self.button)
  
  return self.boxLayout
  
 def displayMessage(self, btn):
  self.label.text = self.textInput.text

if __name__ == '__main__':
 simpleApp = SimpleApp()
 simpleApp.run()