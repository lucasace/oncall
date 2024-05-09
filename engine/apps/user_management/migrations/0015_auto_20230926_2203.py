# Generated by Django 3.2.20 on 2023-09-26 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0014_auto_20230728_0802'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['is_active', 'organization', 'username'], name='user_manage_is_acti_385fc4_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['is_active', 'organization', 'email'], name='user_manage_is_acti_7e930d_idx'),
        ),
    ]