from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

import logging
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)

# Configure the MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Day12345@localhost:3306/ampcal'
db = SQLAlchemy(app)

# Define your database models
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_number = db.Column(db.String(100))
    date_started = db.Column(db.Date)
    customer = db.Column(db.String(100))
    contact = db.Column(db.String(100))
    assets = db.Column(db.String(255))
    status = db.Column(db.String(20))

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    contact = db.Column(db.String(100))

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(100))

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_job', methods=['POST'])
def add_job():
    data = request.form.to_dict()
    job = Job(
        project_number=data['project_number'],
        date_started=data['date_started'],
        customer=data['customer'],
        contact=data['contact'],
        assets=data.get('assets', ''),
        status='in-progress'
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/add_company', methods=['POST'])
def add_company():
    data = request.form.to_dict()
    company = Company(
        name=data['company_name'],
        address=data['company_address'],
        contact=data['company_contact']
    )
    db.session.add(company)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/add_contact', methods=['POST'])
def add_contact():
    data = request.form.to_dict()
    contact = Contact(
        name=data['contact_name'],
        email=data['email'],
        phone=data['phone']
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='127.0.0.1', port=5000)

